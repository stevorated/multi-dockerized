import { Router } from 'express';
import { router as valuesRouter } from './values';
import { keys } from '../config';

const { serviceName } = keys;
const baseRouter = Router();

baseRouter.get('/', (_, res) => {
    return res.status(200).send({
        message: `welcome to ${serviceName} server`,
        status: 'Cool',
    });
});

baseRouter.use('/values', valuesRouter);

export { baseRouter };
