import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const isDev = process.env.NODE_ENV === 'development' ? true : false;

const confirmEmailSchema = Joi.object().keys({
  id: Joi.string().required(),
  c: Joi.string().min(16).required(),
});

export function confirmEmail(req: Request, res: Response, next: NextFunction) {
  const result = confirmEmailSchema.validate(req.query);

  if (result.error) {
    return res.status(400).json({
      error: true,
      message: 'Invalid input parameters',
      details: isDev ? result.error : 'none',
    });
  }

  next();
}
