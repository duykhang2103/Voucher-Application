import mongoose from "mongoose";
import { commitWithRetry } from "../../utils/sessionRetry";
import Event from "../event/event.model";
import Voucher, { VoucherStatus } from "./voucher.model";
import { IVoucher } from "./voucher.interface";

const create = async (voucher: IVoucher, session: mongoose.ClientSession) => {
  session.startTransaction();

  const { code, discount, eventId, userId, expireAt } = voucher;
  const event = await Event.findById(eventId);
  if (!event) {
    return new Error("Event not found");
  }
  if (event.quantity === 0) {
    return new Error("Event is full");
  }
  const newCode = code ? code : Math.random().toString(36).substring(7);
  const newVoucher = await Voucher.create(
    [
      {
        code: newCode,
        discount,
        eventId,
        userId,
        expireAt,
      },
    ],
    { session }
  );
  await Event.findByIdAndUpdate(
    eventId,
    { $inc: { quantity: -1 } },
    { new: true, session }
  );

  try {
    await commitWithRetry(session);
    return newVoucher;
  } catch (error) {
    await session.abortTransaction();
    return error;
  }
};

const update = async (voucher: IVoucher) => {
  const { _id, code, discount, userId, expireAt } = voucher;
  const updatedVoucher = await Voucher.findByIdAndUpdate(
    _id,
    { code, discount, userId, expireAt },
    { new: true }
  );
  return updatedVoucher;
};

const useVoucher = async (code: string, userId: string, eventId: string) => {
  const voucher = await Voucher.findOne({ code, userId, eventId });
  if (!voucher) {
    return null;
  }
  voucher.status = VoucherStatus.USED;
  await voucher.save();

  return voucher;
};

export const VoucherService = {
  create,
  update,
  useVoucher,
};
