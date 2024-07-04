import User, { IUser } from "./user.model";
import { UserService } from "./user.service";

export const UserResolver = {
  Query: {
    users: () => {
      const users = User.find();
      return users;
    },
    // parents, args, context, info
    userByName: async (_: any, { name }: { name: string }) => {
      const user = await User.findOne({ name });
      return user;
    },

    userById: async (_: any, { _id }: { _id: string }) => {
      const user = await User.findById(_id);
      return user;
    },
  },
  Mutation: {
    createUser: async (_: any, { user }: { user: IUser }) => {
      const newUser = await UserService.create(user);
      return newUser;
    },

    signIn: async (
      _: any,
      { email, password }: { email: string; password: string }
    ) => {
      const token = await UserService.signIn(email, password);
      return token;
    },

    useVoucher: async (
      _: any,
      { code, eventId }: { code: string; eventId: string },
      ctx: any
    ) => {
      const userId = ctx.userId;
      console.log(userId);
      const voucher = await UserService.useVoucher(code, userId, eventId);
      return voucher;
    },
  },
  User: {
    name: (obj: IUser) => obj.name.toUpperCase(),
  },
};
