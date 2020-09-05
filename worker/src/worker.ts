import redis from 'redis';

import { keys } from './config';
import { fibSlow } from './fib';

export const client = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => {
        console.warn('retry connect');
        return 1000;
    },
});

export const sub = client.duplicate();

sub.on('message', (_: any, message: string) => {
    client.hset('values', message, fibSlow(message).toString());
});

sub.subscribe('insert');
