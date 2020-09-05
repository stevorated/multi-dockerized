import to from 'await-to-js';
import { verify } from 'argon2';
import crypto from 'crypto';
import dayjs from 'dayjs';
import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import * as uuid from 'uuid';
import jwt from 'jsonwebtoken';

import { User } from '../db';
import { sendEmail, RedisHelper, JwtHelper, logger } from '../utils';
import { keys, redisClient } from '../config';
import { HTTP401Error, HTTP404Error, HTTP500Error } from '../etc';
import { LogHelper } from './LogHelper';

export type TokenPayload = {
  user: Partial<User> | string;
};

export class AuthHelper {
  constructor() {}

  signIn = async (email: string, password: string): Promise<User> => {
    const [err, userByMail] = await to(User.findOne({ email }));

    if (!userByMail) {
      throw new HTTP404Error('User was not found');
    }
    if (err) {
      throw new HTTP500Error('Fetch Error');
    }

    const verifyPassword = await verify(
      userByMail.password,
      userByMail.salt + password
    );

    if (!verifyPassword) {
      throw new HTTP401Error('Wrong Details login details');
    }

    return userByMail;
  };

  signUp = async (
    email: string,
    password: string,
    username: string
  ): Promise<Partial<User> & { refreshToken: string; token: string }> => {
    let userAfterCreation = null;
    let refreshToken = null;
    let token = null;

    const uid = uuid.v1();
    const salt = this._generateSalt();

    const existingUserByEmail = await User.findOne({ email });

    if (existingUserByEmail) {
      throw new HTTP401Error('Email taken');
    }

    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      throw new HTTP401Error('Username taken');
    }

    const user = new User();

    Object.assign(user, {
      username: username.trim(),
      email: email.trim(),
      password: password.trim(),
      id: uid,
      salt,
      isActive: true,
      isConfirmed: false,
      role: 'user',
    });

    [token, refreshToken] = await this.createTokens(user);

    await user.save();

    userAfterCreation = await User.findOne({ email, username });

    if (!userAfterCreation) {
      throw new HTTP500Error('Cannot find new user after creation');
    }

    await this._sendConfirmationEmail(email.trim(), uid);

    return { ...userAfterCreation, refreshToken, token };
  };

  createTokens = async (user: User): Promise<[string, string]> => {
    const { token, refreshToken, saltyVersion } = await JwtHelper.createTokens(
      user
    );

    const savedToRedis = RedisHelper.hset('refresh_tokens', refreshToken, {
      uid: user.id,
      version: saltyVersion,
    });

    if (!savedToRedis) {
      throw new HTTP500Error('not saved to redis');
    }

    logger.info('saved new tokens', refreshToken);
    return Promise.all([token, refreshToken]);
  };

  addUserToRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { tokenName, refreshTokenName } = keys;

    if (!redisClient) {
      return;
    }

    let token = <string>req.headers[tokenName];
    let refreshToken = <string>req.headers[refreshTokenName];

    if (!token) {
      token = <string>req.cookies?.[tokenName];
    }
    if (!refreshToken) {
      refreshToken = <string>req.cookies?.[refreshTokenName];
    }

    if (token && refreshToken) {
      try {
        this._checkToken(req, token);
      } catch (err) {
        const [error, newTokens] = await to(this._refreshTokens(refreshToken));

        req.invalidatedRefreshToken = refreshToken;

        if (error || !newTokens) {
          return next();
        }

        if (newTokens.token && newTokens.refreshToken) {
          this.setHeaders(res, newTokens.token, newTokens.refreshToken);
        }

        LogHelper.saveAction(
          req,
          'refresh',
          newTokens.refreshToken,
          newTokens.user.id
        );

        req.newToken = newTokens.token;
        req.newRefreshToken = newTokens.refreshToken;
        req.user = AuthHelper.pickUserFields(newTokens.user);
      }
    }
    next();
  };

  private _refreshTokens = async (refreshToken: string) => {
    let [err, verifiedPayload] = await to(
      JwtHelper.verifyRefreshToken(refreshToken)
    );

    if (err || !verifiedPayload?.userId || !verifiedPayload?.version) {
      throw new HTTP401Error(err?.toString());
    }

    const user = await User.findOne({ id: verifiedPayload?.userId });

    if (!user) {
      throw new HTTP404Error('ID in refresh token does not match user');
    }

    const check = JwtHelper.checkSaltyVersion(
      user.password,
      user.salt,
      user.tokenVersion,
      verifiedPayload?.version
    );

    await to(RedisHelper.hdelRefreshToken(refreshToken));

    if (!check) {
      throw new HTTP401Error(
        'token invalidated, could not verify token version'
      );
    }

    const [newToken, newRefreshToken] = await this.createTokens(user);

    return {
      token: newToken,
      refreshToken: newRefreshToken,
      user,
    };
  };

  private _checkToken = (req: Request, token: string): void => {
    const { tokenSecret } = keys;
    const payload = <{ user: Partial<User> }>jwt.verify(token, tokenSecret);
    req.user = payload.user;
  };

  public setHeaders(res: Response, token: string, refreshToken: string) {
    const { tokenName, refreshTokenName } = keys;

    res.header(
      'Access-Control-Allow-Methods',
      'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    );
    res.set(
      'Access-Control-Expose-Headers',
      `${tokenName}, ${refreshTokenName}`
    );

    logger.info(`new token ${token}`);
    logger.info(`new refresh token ${refreshToken}`);

    this._signCookies(res, token, refreshToken);
  }

  confirmEmail = (id: string, code: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (!redisClient) {
        logger.error('no conn');
        reject('no conn');
      }

      console.log(id, code);

      const redisKey = `confirmation_${id}`;
      redisClient?.get(redisKey, async (err, data) => {
        if (err) {
          logger.error(`Redis error: ${err}`);
          reject(`Redis error: ${err}`);
        }

        console.log('HERE', err, data);
        if (data) {
          if (data === code) {
            const user = await User.findOne({ id });

            if (!user) {
              logger.error(`user not found: ${id}`);
              reject(`user not found: ${id}`);
              return;
            }

            user.isConfirmed = true;

            user
              .save()
              .then(() => {
                redisClient?.del(redisKey, (err, _reply) => {
                  if (err) console.error('Redis delete error: ' + err);
                });
                logger.info(`User with ${user.email} confirmed`);
                resolve(true);
              })
              .catch((err) => {
                logger.error(`Could not save to DB: ${err}`);
                reject(`Could not save to DB: ${err}`);
              });
          } else {
            logger.error(`Code does not match`);
            reject('Code does not match');
          }
        } else {
          logger.error(`Confirmation code has expired or does not exist`);
          reject('Confirmation code has expired or does not exist');
        }
      });
    });
  };

  static pickUserFields<User>(user: User) {
    return _.pick(user, [
      'id',
      'username',
      'email',
      'isActive',
      'isConfirmed',
      'role',
    ]);
  }

  static isLoggedOut(req: Request, res: Response, done: NextFunction) {
    if (req.user?.id) {
      return res.status(400).json({
        error: true,
        message: 'You Are Already Logged In',
      });
    }

    done();
  }

  static isLoggedIn = (soft: boolean = false) => (
    req: Request,
    res: Response,
    done: NextFunction
  ) => {
    if (!req.user?.id) {
      if (!soft) {
        return res.status(403).json({
          error: true,
          message: 'User Logged Out. Please Log In',
        });
      }

      return res.status(200).send({
        error: true,
        message: 'User Logged Out. Please Log In',
      });
    }

    done();
  };

  private _sendConfirmationEmail = async (email: string, uid: string) => {
    const uniqueCode = this._generateSalt();
    redisClient?.setex(`confirmation_${uid}`, 60 * 60 * 24, uniqueCode);

    const link = `${keys?.appDomain}/confirm/user/${uid}/${uniqueCode}`;
    try {
      await sendEmail('confirmation', {
        email,
        link,
      });
    } catch (err) {
      throw new HTTP500Error(
        `Error sending confirmation email to ${email}: ${err}`
      );
    }
  };

  _signCookies(res: Response, token: string, refreshToken: string) {
    const cookieConfig = { httpOnly: true, secure: false };
    const { tokenName, refreshTokenName } = keys;

    res.set(
      'Access-Control-Expose-Headers',
      `${tokenName}, ${refreshTokenName}`
    );

    res.cookie(tokenName, token, {
      ...cookieConfig,
      expires: dayjs().add(3, 'hour').add(1, 'minute').toDate(),
      // maxAge: 1000,
    });

    res.cookie(refreshTokenName, refreshToken, {
      ...cookieConfig,
      expires: dayjs().add(3, 'hour').add(7, 'day').toDate(),
    });
  }

  static revokeCookies = (res: Response) => {
    const cookieConfig = { httpOnly: true, secure: false };
    const { tokenName, refreshTokenName } = keys;

    res.set(
      'Access-Control-Expose-Headers',
      `${tokenName}, ${refreshTokenName}`
    );

    res.cookie(tokenName, '', {
      ...cookieConfig,
      expires: new Date(Date.now()),
    });

    res.cookie(refreshTokenName, '', {
      ...cookieConfig,
      expires: new Date(Date.now()),
    });
  };

  private _generateSalt() {
    return crypto.randomBytes(16).toString('hex');
  }
}
