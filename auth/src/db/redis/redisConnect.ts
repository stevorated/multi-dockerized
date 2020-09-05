import redis, { RedisClient } from 'redis';
import { keys } from '../../config/keys';
import { logger } from '../../utils';

// TODO REPLACE REDIS WITH TEDIS
export const createRedisClient = (): RedisClient[] | null => {
  try {
    const client = redis
      .createClient({
        host: keys.redisHost,
        port: keys.redisPort,
        retry_strategy: function (options) {
          if (options.error && options.error.code === 'ECONNREFUSED') {
            return console.error('The server refused the connection');
          }

          if (options.total_retry_time > 2000) {
            return console.error('Retry time exhausted');
          }

          if (options.attempt > 10) {
            return console.error('Retry time exhausted due to attempts');
          }

          return Math.min(options.attempt * 100, 3000);
        },
      })
      .on('connect', function () {
        logger.info('Connected to Redis');
      })
      .on('error', function (err) {
        logger.error(`Redis error: ${err.message}`);
      });

    const publisher = client.duplicate();
    publisher.on('error', function (err) {
      logger.error(`Redis error - pub ${err.message}`);
    });

    return [client, publisher];
  } catch (error) {
    logger.error('redis connection error')
    return null;
  }
};
