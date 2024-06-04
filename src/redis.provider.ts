// src/redis.provider.ts
//import * as Redis from 'ioredis';

import Redis from 'ioredis';

export const redisProvider = {
  provide: 'REDIS_CLIENT',
  useFactory: () => {
    return new Redis({
      host: 'localhost', // ou o host do seu servidor Redis
      port: 6379, // ou a porta do seu servidor Redis
    });
  },
};