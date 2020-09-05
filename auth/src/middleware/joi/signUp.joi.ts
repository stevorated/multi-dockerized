import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const isDev = process.env.NODE_ENV === 'development' ? true : false;

const signUpSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .max(128)
    .pattern(new RegExp('^[a-zA-Z0-9]{8,128}$'))
    .required(),
  username: Joi.string().min(2).max(30).required(),
});

export function signUp(req: Request, res: Response, next: NextFunction) {
  const result = signUpSchema.validate(req.body);
  if (result.error) {
    return res.status(400).json({
      error: true,
      message: 'Invalid input parameters',
      details: isDev ? result.error.details : 'none',
    });
  }

  next();
}
