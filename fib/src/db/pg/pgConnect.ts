import { Pool } from 'pg';

import { keys } from '../../config';

const { pgUser, pgHost, pgDb, pgPassword, pgPort } = keys;

export const pgClient = new Pool({
    user: pgUser,
    password: pgPassword,
    host: pgHost,
    database: pgDb,
    port: pgPort,
});

pgClient.on('connect', () => {
    pgClient
        .query('CREATE TABLE IF NOT EXISTS values (number INT)')
        .catch((err) => console.log(err));
});
