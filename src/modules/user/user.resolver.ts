import { create } from "lodash";
import User, { IUser } from "./user.model";
import {
  comparePassword,
  hashPassword,
  genToken,
  checkToken,
} from "../../config/auth";

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
      const { name, email, password } = user;
      const userExists = await User.findOne({ email });
      if (userExists) {
        throw new Error("User already exists");
      }
      const hashedPassword = await hashPassword(password);
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      return newUser;
    },

    signIn: async (
      _: any,
      { email, password }: { email: string; password: string }
    ) => {
      const user = await User.findOne({
        email,
      });

      if (!user) {
        throw new Error("User not found");
      }

      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        throw new Error("Invalid credentials");
      }

      const token = await genToken(user);

      return token;
    },
  },
  User: {
    name: (obj: IUser) => obj.name.toUpperCase(),
  },
};
