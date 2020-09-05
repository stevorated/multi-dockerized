import { redisClient } from '../config';
import { logger } from '../utils';

export type RedisRefreshToken = { uid: string; salty: string };

export class RedisHelper {
  static deleteTokenAfterCheck = async (
    token: string,
    id: string,
    check: boolean = false
  ): Promise<RedisRefreshToken> => {
    return new Promise((resolve, reject) => {
      redisClient?.hget('refresh_tokens', token, (err, data) => {
        if (err || !data) {
          reject('token not found in store');
          return;
        }

        const parsedData = JSON.parse(data) as RedisRefreshToken;

        if (check && parsedData?.uid !== id) {
          reject('ids dont match');
          return;
        }

        redisClient?.hdel('refresh_tokens', token, (err) => {
          if (err) {
            reject('unable to delete from redis');
            return;
          }

          resolve(parsedData);
        });
      });
    });
  };

  hget = async (key: string) => {
    return new Promise((resolve, reject) => {
      redisClient?.hget('refresh_tokens', key, (_err, data) => {
        if (!data) {
          reject('token not found');
          return;
        }

        resolve(JSON.parse(data) as RedisRefreshToken);
      });
    });
  };

  static hdelRefreshToken = async (key: string) => {
    return new Promise((resolve, reject) => {
      logger.info('hdelRefreshToken');
      redisClient?.hdel('refresh_tokens', key, (err, data) => {
        if (err || !data) {
          reject('unable to delete from redis');
        }

        resolve(data);
      });
    });
  };

  static hset = (key: string, field: string, value: object | string) => {
    return redisClient?.hset(key, field, JSON.stringify(value));
  };
}
