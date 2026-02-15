import Redis from "ioredis";

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  console.warn("REDIS_URL not found,no caching.");
}

export const redis = redisUrl
  ? new Redis(redisUrl)
  : {
      get: async () => null,
      set: async () => null,
      del: async () => null,
    };
