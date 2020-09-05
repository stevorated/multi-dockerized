import to from 'await-to-js';
import jwt from 'jsonwebtoken';
import { keys } from '../config';
import { RedisHelper, RedisRefreshToken } from './RedisHelper';
import { AuthHelper } from '../helpers';
import { User } from '../db';
import { HTTP500Error } from '../etc';

interface VerifiedRefreshPayload {
  userId: string;
  cameBackFromRedis: RedisRefreshToken;
  version: string;
}

export class JwtHelper {
  private static _createToken = (user: User): string => {
    const { tokenSecret, tokenLife } = keys;
    const payload = {
      user: AuthHelper.pickUserFields(user),
    };
    const token = jwt.sign(payload, tokenSecret, { expiresIn: tokenLife });

    return token;
  };

  private static _createRefreshToken = async (
    user: User
  ): Promise<{ refreshToken: string; saltyVersion: string }> => {
    const newTokenVersion = user?.tokenVersion ? user?.tokenVersion + 1 : 1;
    const [err] = await to(
      User.update({ id: user.id }, { tokenVersion: newTokenVersion })
    );

    if (err) {
      throw new HTTP500Error(
        `Unable to bump user's tokenVersion => ${err.message}`
      );
    }

    const saltyVersion = JwtHelper.createSaltyVersion(
      user.password,
      user.salt,
      user?.tokenVersion ? user?.tokenVersion + 1 : 1
    );

    const { refreshTokenSecret, refreshTokenLife } = keys;
    const payload = {
      user: {
        id: user.id,
      },
      version: saltyVersion,
    };

    const refreshToken = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: refreshTokenLife,
    });

    return { refreshToken, saltyVersion };
  };

  static createTokens = async (
    user: User
  ): Promise<{
    token: string;
    refreshToken: string;
    saltyVersion: string;
  }> => {
    const token = JwtHelper._createToken(user);
    const { refreshToken, saltyVersion } = await JwtHelper._createRefreshToken(
      user
    );

    return { token, refreshToken, saltyVersion };
  };

  static async verifyRefreshToken(
    refreshToken: string
  ): Promise<VerifiedRefreshPayload> {
    return new Promise((resolve, reject) => {
      const payload = jwt.verify(refreshToken, keys.refreshTokenSecret) as {
        user: { id: string };
        version: string;
      };

      if (!payload.user || !payload.user.id || !payload.version) {
        reject('user data or version missing');
        return;
      }

      RedisHelper.deleteTokenAfterCheck(refreshToken, payload.user.id)
        .then((cameBackFromRedis) => {
          const userId = payload.user.id;

          if (!userId) {
            reject('no user id');
            return;
          }

          resolve({ userId, cameBackFromRedis, version: payload.version });
        })
        .catch((err) => reject(err));
    });
  }

  static createSaltyVersion = (
    passwordHash: string,
    salt: string,
    version: number
  ) => {
    console.log(
      '======================================',
      passwordHash + salt + version,
      '======================================'
    );
    return passwordHash + salt + version;
  };

  static checkSaltyVersion = (
    passwordHash: string,
    salt: string,
    version: number,
    checkAgainst: string
  ) => {
    return passwordHash + salt + version === checkAgainst;
  };
}
