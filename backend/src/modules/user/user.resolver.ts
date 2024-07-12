import { IUpdateUserPayload, IUser } from "./user.inteface";
import User from "./user.model";
import { UserService } from "./user.service";

export const UserResolver = {
  Query: {
    users: () => {
      const users = User.find();
      return users;
    },
    // parents, args, context, info
    usersByName: async (_: any, { name }: { name: string }) => {
      const user = await User.find({ name });
      return user;
    },

    userById: async (_: any, { _id }: { _id: string }) => {
      const user = await User.findById(_id);
      return user;
    },
  },
  Mutation: {
    updateMe: async (
      _: any,
      { payload }: { payload: { name: string } },
      ctx: any
    ) => {
      const userId = ctx.userId;
      const updatedUser = await UserService.update(userId, payload);
      return updatedUser;
    },

    update: async (
      _: any,
      { userId, payload }: { userId: string; payload: IUpdateUserPayload }
    ) => {
      const updatedUser = await UserService.update(userId, payload);
      return updatedUser;
    },

    delete: async (_: any, { userId }: { userId: string }) => {
      const isDeleted = await UserService.deleteOne(userId);
      return isDeleted;
    },
  },
  User: {
    name: (user: IUser) => user.name.toUpperCase(),
  },
};
