import 'reflect-metadata';

import express from 'express';
import errorHandler from 'strong-error-handler';
import { createConnection } from 'typeorm';

import { keys } from './config';
import { Value } from './db';
import { applyMiddlewares, middlewares } from './middleware';
import { logger } from './utils';
import { baseRouter } from './routes';

const { port, pgHost, pgPort, pgDb, pgUser, pgPassword } = keys;

const app = express();

applyMiddlewares(middlewares, app);
app.use(baseRouter);
app.use(errorHandler({ debug: process.env.NODE_ENV === 'development' }));

(async () => {
    try {
        const schema = 'fib';
        const conn = await createConnection({
            type: 'postgres',
            host: pgHost,
            port: pgPort,
            username: pgUser,
            password: pgPassword,
            database: pgDb,
            entities: [Value],
            logging: false,
            schema,
        });

        await conn.query(`CREATE SCHEMA IF NOT EXISTS ${schema};`);
        await conn.synchronize();
        logger.info('Connection to Databases established!');
    } catch (err) {
        logger.error(`DB Connection Error: ${err.message}`);
    }

    app.listen(port, async () => {
        logger.info(`User server running 🏃 on port ${port} 🦈`);
    });
})();
