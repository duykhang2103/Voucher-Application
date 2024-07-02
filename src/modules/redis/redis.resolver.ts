export const RedisResolver = {
  Query: {
    redisGet: async (_: any, { key }: any, { redis }: any) => {
      return await redis.get(key);
    },
  },
  Mutation: {
    redisSet: async (_: any, { key, value }: any, { redis }: any) => {
      await redis.set(key, value);
      return value;
    },

    redisDel: async (_: any, { key }: any, { redis }: any) => {
      await redis.del(key);
      return key;
    },

    redisPush: async (_: any, { key, value }: any, { redis }: any) => {
      await redis.rpush(key, value);
      return value;
    },
  },
};
