import { hash, compare } from "bcrypt";
import { JWT_SECRET, SALT } from "./const";
import jwt from "jsonwebtoken";
export const hashPassword = async (password: string) => {
  const hashedPassword = await hash(password, SALT);
  return hashedPassword;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  return await compare(password, hashedPassword);
};

export const genToken = async (data: any, expire: number = 100) => {
  const token = jwt.sign(data, JWT_SECRET);
  return token;
};

export const checkToken = async (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
