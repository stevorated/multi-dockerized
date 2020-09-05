import { get } from 'lodash';
import winston from 'winston';

// const isProd = process.env.NODE_ENV === 'production';

export const logger = winston.createLogger({
  // level: isProd ? 'info' : 'debug',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
        winston.format.timestamp({
          format: 'YY-MM-DD HH:mm:ss',
        }),
        winston.format.printf((info) => {
          let metaAddon;
          let { res }: { res: unknown } = info.meta || {};
          const { error, req }: { error: Error; req: unknown } =
            info.meta || {};

          if (get(res, 'body.length') > 5000) {
            if (typeof res === 'object') {
              res = { ...res, body: '";<TooLong>;"' };
            } else {
              res = { res, body: '";<TooLong>;"' };
            }
          }

          try {
            metaAddon = info.meta
              ? ` ${JSON.stringify({ error, req, res })}`
              : '';
          } catch (e) {
            metaAddon = ` ${JSON.stringify({
              error: { message: error.message, stack: error.stack },
              req,
              res,
            })}`;
          }

          return `[${info.timestamp}] ${info.level}: ${info.message}${
            metaAddon !== info.message ? metaAddon : ''
          }`;
        })
      ),
    }),

    new winston.transports.File({
      filename: './logs/debug.log',
      format: winston.format.combine(
        winston.format.json(),
        winston.format.timestamp({
          format: 'YY-MM-DD HH:mm:ss',
        }),
        winston.format.printf((info) => {
          return `[${info.timestamp}] ${info.level}: ${JSON.stringify({
            ...info,
            level: undefined,
            timestamp: undefined,
          })}`;
        })
      ),
    }),
  ],
});
