import to from 'await-to-js';
import { Request, Response } from 'express';

import { User } from '../db';
import { AuthHelper, LoginHelper } from '../helpers';
import { logger, RedisHelper } from '../utils';
import { keys } from '../config';
import { ExpressHelper } from '../helpers/ExpressHelper';

interface LoginResponse {
  message: string;
  error: boolean;
}

export class AuthController {
  private static instance: AuthController | null;
  private constructor() {}

  static getInstance = (): AuthController => {
    if (AuthController.instance) {
      return AuthController.instance;
    }

    AuthController.instance = new AuthController();
    return AuthController.instance;
  };

  signUp = async (
    req: Request,
    res: Response
  ): Promise<Response<LoginResponse>> => {
    const authHelper = new AuthHelper();
    const { email, password, username } = req.body;

    const [err, signUp] = await to(
      authHelper.signUp(email, password, username)
    );

    if (err || !signUp || !signUp?.id) {
      if (String(err).includes('Username taken')) {
        return ExpressHelper.send<{}>({
          res,
          status: 400,
          message: 'Username is taken',
        });
      }

      if (String(err).includes('Email taken')) {
        return ExpressHelper.send({
          res,
          status: 400,
          message: 'Email is taken',
        });
      }

      return ExpressHelper.send({
        res,
        status: 500,
        message: 'An internal server error has occurred',
      });
    }

    const msg = `User: ${email} has been created`;

    logger.info(msg);

    const { token, refreshToken, id } = signUp;

    authHelper.setHeaders(res, token, refreshToken);
    await to(LoginHelper.saveAction(req, 'signup', refreshToken, id));

    return ExpressHelper.send<{}>({
      res,
      status: 201,
      message: msg,
      extra: {
        user: AuthHelper.pickUserFields(signUp),
        tokens: { access: token, refresh: refreshToken },
      },
    });
  };

  confirmEmail = async (
    req: Request,
    res: Response
  ): Promise<Response<LoginResponse>> => {
    const id = req.body.id;
    const code = req.body.code;
    const authHelper = new AuthHelper();
    const [error] = await to(authHelper.confirmEmail(id, code));

    if (error) {
      const isTokenInvalid = String(error).includes('code has expired');

      if (isTokenInvalid) {
        return ExpressHelper.send({
          res,
          status: 400,
          message: 'Invalid token',
          extra: { isUserConfirmed: false },
        });
      }

      return ExpressHelper.send({
        res,
        status: 500,
        message: 'An internal server error has occurred',
      });
    }

    return ExpressHelper.send({
      res,
      extra: { isUserConfirmed: true },
      message: 'User was confirmed',
      status: 201,
    });
  };

  handShake = async (req: Request, res: Response) => {
    if (req?.invalidatedRefreshToken) {
      await to(RedisHelper.hdelRefreshToken(req.invalidatedRefreshToken));
    }

    return ExpressHelper.send({
      res,
      status: 201,
      message: 'hand shook',
      extra: {
        isLoggedIn: true,
        tokens: {
          access: req.newToken,
          refresh: req.newRefreshToken,
        },
        user: req.user,
      },
    });
  };

  signIn = async (
    req: Request,
    res: Response
  ): Promise<Response<LoginResponse>> => {
    const { email, password } = req.body;
    const authHelper = new AuthHelper();
    const [err, signIn] = await to(authHelper.signIn(email, password));

    if (err) {
      if (String(err).includes('User was not found')) {
        return ExpressHelper.send({
          res,
          status: 404,
          message: 'User Not Found',
        });
      }

      if (String(err).includes('Wrong Details')) {
        return ExpressHelper.send({
          res,
          status: 404,
          message: 'Wrong User Details',
        });
      }

      return ExpressHelper.send({
        res,
        status: 500,
        message: 'An internal server error has occurred',
      });
    }

    if (!signIn) {
      return ExpressHelper.send({
        res,
        status: 500,
        message: 'User Was Not Found',
      });
    }

    const [token, refreshToken] = await authHelper.createTokens(signIn);

    if (req?.invalidatedRefreshToken) {
      await to(RedisHelper.hdelRefreshToken(req.invalidatedRefreshToken));
    }

    authHelper.setHeaders(res, token, refreshToken);

    await to(LoginHelper.saveAction(req, 'signin', refreshToken, signIn.id));

    return ExpressHelper.send({
      res,
      status: 201,
      message: `User: ${email}`,
      extra: {
        user: AuthHelper.pickUserFields(signIn),
        tokens: { access: token, refresh: refreshToken },
      },
    });
  };

  signOut = async (req: Request, res: Response) => {
    const { refreshTokenName } = keys;
    const user = await User.findOne({ id: req.user.id });

    const [err, signOutResult] = await to(
      User.update(
        { id: req.user.id },
        {
          tokenVersion: (user?.tokenVersion ? user?.tokenVersion : 0) + 2,
        }
      )
    );

    if (err || !signOutResult) {
      return res.send(500).send({
        message: `Could not signOut ${err}`,
      });
    }

    const refreshToken = <string>req.headers[refreshTokenName];

    await to(RedisHelper.hdelRefreshToken(refreshToken));

    AuthHelper.revokeCookies(res);

    return ExpressHelper.send({ res, message: 'Bye Bye, Disconnected.' });
  };

  updateUser = async (_req: Request, res: Response) => {
    const {} = keys;

    res.send({ working: true });
  };

  forgotPassword = async (req: Request, res: Response) => {
    const {} = keys;
    const { id, token } = req.params;

    res.send({ working: true, id, token });
  };
}
