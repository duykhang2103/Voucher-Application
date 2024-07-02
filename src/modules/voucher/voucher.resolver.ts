import Event from "../event/event.model";
import Voucher from "./voucher.model";

export const VoucherResolver = {
  Query: {
    vouchers: async () => {
      const vouchers = await Voucher.find();
      return vouchers;
    },
    voucherById: async (_: any, { id }: any) => {
      const voucher = await Voucher.findById(id);
      return voucher;
    },
  },

  Mutation: {
    createVoucher: async (_: any, { voucher }: any) => {
      const { discount, eventId, expireAt, description } = voucher;
      const event = await Event.findById(eventId);
      if (!event) {
        throw new Error("Event not found");
      }
      if (event.quantity === 0) {
        throw new Error("Event is full");
      }
      const code = Math.random().toString(36).substring(7);
      const newVoucher = await Voucher.create({
        code,
        discount,
        eventId,
        expireAt,
        description,
      });

      event.quantity -= 1;
      await event.save();
      return newVoucher;
    },

    updateVoucher: async (_: any, { voucher }: any) => {
      const { id, code, discount, expireAt, description } = voucher;
      const updatedVoucher = await Voucher.findByIdAndUpdate(
        id,
        { code, discount, expireAt, description },
        { new: true }
      );
      return updatedVoucher;
    },

    deleteVoucher: async (_: any, { _id }: any) => {
      const voucher = await Voucher.findByIdAndDelete(_id);
      return voucher;
    },
  },
};
