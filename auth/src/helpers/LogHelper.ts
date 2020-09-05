import to from 'await-to-js';
import { Request } from 'express';

import { Log, Action } from '../db';
import { logger } from '../utils';

export class LogHelper {
  private static logger = logger;

  constructor() {}

  static saveAction = async (
    req: Request,
    action: Action,
    refreshToken: string,
    userId: string
  ) => {
    const login = new Log();

    Object.assign(login, {
      userId,
      ip: req.connection.remoteAddress?.replace(/::ffff:/i, '').trim(),
      refreshToken,
      action,
    });

    const [err, loginSaved] = await to(login.save());

    if (err || !loginSaved) {
      LogHelper.logger.error(`${action} by userId: ${userId} was not saved.`);
    }
  };
}
