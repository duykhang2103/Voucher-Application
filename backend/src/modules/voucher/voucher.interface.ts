import mongoose from "mongoose";
import { VoucherStatus } from "./voucher.model";

export interface IVoucher {
  _id?: mongoose.Schema.Types.ObjectId;
  code?: string;
  discount?: number;
  eventId?: mongoose.Schema.Types.ObjectId;
  userId?: mongoose.Schema.Types.ObjectId;
  status?: VoucherStatus;
  expireAt?: Date;
}
