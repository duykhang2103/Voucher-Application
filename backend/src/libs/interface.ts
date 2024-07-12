import { Role } from "../modules/user/user.model";

export interface IJwtPayload {
  userId: string;
  email: string;
  role: Role;
  iat?: number;
  exp?: number;
}
