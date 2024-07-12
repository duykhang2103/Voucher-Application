import { IRegisterPayload, ILoginPayload } from "../user/user.inteface";
import { AuthService } from "./auth.service";

export const AuthResolver = {
  Mutation: {
    register: async (_: any, { user }: { user: IRegisterPayload }) => {
      const newUser = await AuthService.register(user);
      return newUser;
    },

    login: async (_: any, { user }: { user: ILoginPayload }) => {
      const { email, password } = user;
      const token = await AuthService.login(email, password);
      return token;
    },
  },
};
