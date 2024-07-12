import mongoose from "mongoose";
import { IVoucher } from "./voucher.interface";

export enum VoucherStatus {
  NEW = "NEW",
  USED = "USED",
}

const voucherSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: VoucherStatus,
    default: VoucherStatus.NEW,
  },
  expireAt: {
    type: Date,
    required: true,
  },
});

const Voucher = mongoose.model<IVoucher>("Voucher", voucherSchema);

export default Voucher;
