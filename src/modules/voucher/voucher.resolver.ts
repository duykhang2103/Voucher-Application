import mongoose from "mongoose";
import Event from "../event/event.model";
import Voucher, { IVoucher } from "./voucher.model";
import { runTransactionWithRetry } from "../../utils/sessionRetry";
import { VoucherService } from "./voucher.service";

export const VoucherResolver = {
  Query: {
    vouchers: async () => {
      const vouchers = await Voucher.find();
      return vouchers;
    },
    voucherById: async (_: any, { _id }: { _id: string }) => {
      const voucher = await Voucher.findById(_id);
      return voucher;
    },
  },

  Mutation: {
    // have to setup replicaset mongodb for transaction
    createVoucher: async (_: any, { voucher }: { voucher: IVoucher }) => {
      const session = await mongoose.startSession();
      await runTransactionWithRetry(VoucherService.create, session, voucher);
    },

    updateVoucher: async (_: any, { voucher }: { voucher: IVoucher }) => {
      const updatedVoucher = await VoucherService.update(voucher);
      return updatedVoucher;
    },

    deleteVoucher: async (_: any, { _id }: { _id: string }) => {
      const voucher = await Voucher.findById(_id);
      if (!voucher) {
        throw new Error("Voucher not found");
      }
      const event = await Event.findById(voucher.eventId);
      Voucher.deleteOne({ _id });
      if (event) {
        event.quantity += 1;
        await event.save();
      }
      return voucher;
    },
  },
};
