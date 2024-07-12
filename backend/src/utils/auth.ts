import { hash, compare } from "bcrypt";
import { JWT_SECRET, SALT } from "../config/const";
import jwt from "jsonwebtoken";
import { IJwtPayload } from "../libs/interface";
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

export const genToken = async (data: IJwtPayload, expire: number = 100) => {
  const token = jwt.sign(data, JWT_SECRET);
  return token;
};

export const verifyToken = async (token: string): Promise<IJwtPayload> => {
  return jwt.verify(token, JWT_SECRET) as IJwtPayload;
};
