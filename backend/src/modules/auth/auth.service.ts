import { comparePassword, genToken, hashPassword } from "../../utils/auth";
import { IRegisterPayload } from "../user/user.inteface";
import User from "../user/user.model";

const register = async (user: IRegisterPayload) => {
  const { name, email, password } = user;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return new Error("User already exists");
  }

  const hashedPassword = await hashPassword(password);
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  return newUser;
};

const login = async (email: string, password: string) => {
  const user = await User.findOne({
    email,
  });
  if (!user) {
    return new Error("User not found");
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    return new Error("Invalid credentials");
  }

  const token = await genToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });
  return token;
};

export const AuthService = {
  register,
  login,
};
