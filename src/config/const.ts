import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 4000;
export const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/graphql?replicaSet=rs"; // replicaSet=rs for transaction

export const SALT = Number(process.env.SALT) || 10;
export const JWT_SECRET = process.env.JWT_SECRET || "secret";
export const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";
