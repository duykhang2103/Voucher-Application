import mongoose from "mongoose";

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
