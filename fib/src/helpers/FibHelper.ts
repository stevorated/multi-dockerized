import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import jwt from 'jsonwebtoken';

import { keys, redisClient } from '../config';
import { ExpressHelper } from './ExpressHelper';

export class FibHelper {
    constructor() {}

    tokenToUserInRequest = async (
        req: Request,
        _res: Response,
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
                this.checkToken(req, token);
            } catch (err) {}
        }
        next();
    };

    private checkToken = (req: Request, token: string): void => {
        const { tokenSecret } = keys;
        const payload = <{ data: Partial<{}> }>jwt.verify(token, tokenSecret);
        req.user = payload.data;
    };

    static isLoggedIn = (soft: boolean = false) => (
        req: Request,
        res: Response,
        done: NextFunction
    ) => {
        if (!req.user?.id) {
            if (!soft) {
                return ExpressHelper.send({
                    res,
                    status: 403,
                    message: 'User Logged Out. Please Log In',
                });
            }

            return ExpressHelper.send({
                res,
                status: 203,
                message: 'User Logged Out. Please Log In',
            });
        }

        done();
    };
}
