import { logger } from '../utils';

export abstract class HTTPClientError extends Error {
  readonly statusCode!: number;
  readonly name!: string;

  protected constructor(message: object | string) {
    if (message instanceof Object) {
      super(JSON.stringify(message));
    } else {
      super(message);
    }
    this.name = this.constructor.name;
    logger.error(this.message, this);
  }
}

export class HTTP400Error extends HTTPClientError {
  readonly statusCode = 400;

  constructor(message = '400 Bad Request') {
    super(message);
  }
}

export class HTTP401Error extends HTTPClientError {
  readonly statusCode = 401;

  constructor(message = '401 Unauthorized') {
    super(message);
  }
}

export class HTTP403Error extends HTTPClientError {
  readonly statusCode = 403;

  constructor(message = '403 Forbidden') {
    super(message);
  }
}

export class HTTP404Error extends HTTPClientError {
  readonly statusCode = 404;

  constructor(message = 'Route not found') {
    super(message);
  }
}

export class HTTP500Error extends HTTPClientError {
  readonly statusCode = 500;

  constructor(message = 'Internal server error') {
    super(message);
  }
}

export const errors = {
  HTTP400Error,
  HTTP401Error,
  HTTP403Error,
  HTTP404Error,
  HTTP500Error,
};
