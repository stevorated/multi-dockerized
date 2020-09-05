export interface Config {
  serviceName: string;
  appDomain: string;
  port: number;
  redisHost?: string;
  redisPort: number;
  pgHost: string;
  pgDb: string;
  pgUser: string;
  pgPassword: string;
  pgPort: number;
  SG_API_KEY: string;
  tokenName: string;
  tokenSecret: string;
  tokenLife: string | number;
  refreshTokenName: string;
  refreshTokenSecret: string;
  refreshTokenLife: string | number;
  siteEmail?: string;
}

export const keys: Config = {
  serviceName: process.env.SERVICE_NAME ?? 'default service name',
  appDomain: process.env.APP_DOMAIN ?? `http://localhost:${process.env.PORT}`,
  port: process.env.PORT ? parseInt(process.env.PORT) : 8083,
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
  pgHost: process.env.POSTGRES_HOST ?? 'postgres',
  pgDb: process.env.POSTGRES_DB ?? 'postgres',
  pgUser: process.env.POSTGRES_USER ?? 'postgres',
  pgPassword: process.env.POSTGRES_PASSWORD ?? 'postgres_password',
  pgPort: process.env.POSTGRES_PORT
    ? parseInt(process.env.POSTGRES_PORT)
    : 5432,
  SG_API_KEY: process.env.SG_API_KEY ?? 'SG_API_KEY',
  tokenName: process.env.TOKEN_NAME ?? 'X-My-Site-1',
  tokenSecret: process.env.TOKEN_SECRET ?? 'secret',
  tokenLife: process.env.TOKEN_LIFE ?? '1m',
  refreshTokenName: process.env.REFRESH_TOKEN_NAME ?? 'X-My-Site-2',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET ?? 'refresh_secret',
  refreshTokenLife: process.env.REFRESH_TOKEN_LIFE ?? '7d',
  siteEmail: process.env.SITE_EMAIL,
};
