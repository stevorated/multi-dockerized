import { createRedisClient } from '../db';

const res = createRedisClient() ?? [null, null];

export const [redisClient, redisPub] = res;
