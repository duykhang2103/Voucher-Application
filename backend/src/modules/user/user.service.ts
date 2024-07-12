import Voucher, { VoucherStatus } from "../voucher/voucher.model";
import { IUpdateUserPayload } from "./user.inteface";
import User from "./user.model";

const update = async (userId: string, payload: IUpdateUserPayload) => {
  const user = await User.findById(userId);
  if (!user) {
    return new Error("User not found");
  }
  const updatedUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
  });
  return updatedUser;
};

const deleteOne = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    return new Error("User not found");
  }
  await User.findByIdAndDelete(userId);
  return true;
};

export const UserService = {
  update,
  deleteOne,
};
