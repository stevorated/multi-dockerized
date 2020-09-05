interface Config {
    port: number;
    redisHost?: string;
    redisPort?: number;
    pgHost?: string;
    pgDb?: string;
    pgUser?: string;
    pgPassword?: string;
    pgPort?: number;
}

export const keys: Config = {
    port: process.env.PORT ? parseInt(process.env.PORT) : 8082,
    redisHost: process.env.REDIS_HOST,
    redisPort: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
};
