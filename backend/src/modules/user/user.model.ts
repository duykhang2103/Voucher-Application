import mongoose from "mongoose";
import { IUser } from "./user.inteface";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Role,
    default: Role.USER,
  },
});
const User = mongoose.model<IUser>("User", UserSchema);

export default User;
