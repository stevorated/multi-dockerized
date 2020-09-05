import { Router } from 'express';

import { router as tokenRouter } from './user';
import { HTTP404Error } from '../etc';
import { keys } from '../config';

const { serviceName } = keys;
const baseRouter = Router();

baseRouter.get('/', (_, res) => {
  return res.status(200).send({
    message: `welcome to ${serviceName} server`,
    status: 'Cool',
  });
});
baseRouter.use('/user', tokenRouter);

baseRouter.get('*', (_req, _res) => {
  throw new HTTP404Error();
});

export { baseRouter };
