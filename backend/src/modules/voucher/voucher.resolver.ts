import mongoose from "mongoose";
import Event from "../event/event.model";
import Voucher from "./voucher.model";
import { runTransactionWithRetry } from "../../utils/sessionRetry";
import { VoucherService } from "./voucher.service";
import { QueueService } from "../queue/queue.service";
import User from "../user/user.model";
import { IVoucher } from "./voucher.interface";

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
      const user = await User.findById(voucher.userId);
      if (user && user.email && voucher.code)
        QueueService.addItem({ email: user.email, code: voucher.code });
      // TODO: cant return voucher
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

    useVoucher: async (
      _: any,
      { code, eventId }: { code: string; eventId: string },
      ctx: any
    ) => {
      const userId = ctx.userId;
      console.log(userId);
      const voucher = await VoucherService.useVoucher(code, userId, eventId);
      return voucher;
    },
  },
};
