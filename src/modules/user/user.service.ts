import { comparePassword, genToken, hashPassword } from "../../config/auth";
import Voucher, { VoucherStatus } from "../voucher/voucher.model";
import User, { IUser } from "./user.model";

const useVoucher = async (code: string, userId: string, eventId: string) => {
  const voucher = await Voucher.findOne({ code, userId, eventId });
  if (!voucher) {
    return null;
  }
  voucher.status = VoucherStatus.INACTIVE;
  await voucher.save();

  return voucher;
};

const create = async (user: IUser) => {
  const { name, email, password } = user;
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("User already exists");
  }
  const hashedPassword = await hashPassword(password);
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  return newUser;
};

const signIn = async (email: string, password: string) => {
  const user = await User.findOne({
    email,
  });
  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = await genToken({ userId: user._id });
  return token;
};

export const UserService = {
  useVoucher,
  create,
  signIn,
};
