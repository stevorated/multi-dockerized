import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const isDev = process.env.NODE_ENV === 'development' ? true : false;

const signUpSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(128).required(),
  // username: Joi.string().min(2).max(50).required(),
});

export function signIn(req: Request, res: Response, next: NextFunction) {
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
