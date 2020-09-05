import {
  // Request,
  Response,
  // NextFunction,
} from 'express';

interface SendOptions<T> {
  message: string;
  res: Response;
  status?: number;
  extra?: T;
}

interface AppResponse {
  message: string;
  error: boolean;
}

export class ExpressHelper {
  static send = <T>({
    res,
    message,
    status = 200,
    extra,
  }: SendOptions<T>): Response<
    AppResponse & {
      extra?: T;
    }
  > => {
    return res.status(status).send({
      message,
      error: parseInt(status.toString().split('')[0]) > 2,
      ...extra,
    });
  };
}
