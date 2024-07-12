import { createClient } from "redis";
import { REDIS_URL } from "./const";

// bcz there is no Client, redis will be used to store token
export const redis = createClient({ url: REDIS_URL });

redis.on("connect", () => console.log("Redis Client Connected"));
redis.on("error", (err) => console.log("Redis Client Error", err));
