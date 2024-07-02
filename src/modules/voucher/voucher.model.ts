import mongoose from "mongoose";

export interface IVoucher {
  _id?: mongoose.Schema.Types.ObjectId;
  code?: string;
  discount?: number;
  eventId?: mongoose.Schema.Types.ObjectId;
  userId?: mongoose.Schema.Types.ObjectId;
  status?: VoucherStatus;
  expireAt?: Date;
}

export enum VoucherStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
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
    default: VoucherStatus.ACTIVE,
  },
  expireAt: {
    type: Date,
    required: true,
  },
});

const Voucher = mongoose.model("Voucher", voucherSchema);

export default Voucher;
