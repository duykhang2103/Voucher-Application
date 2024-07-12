import mongoose from "mongoose";
import { Role } from "./user.model";

export interface IUser {
  _id?: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IUpdateUserPayload {
  name?: string;
  email?: string;
  password?: string;
  role?: Role;
}
