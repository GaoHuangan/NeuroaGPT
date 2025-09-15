// apps/server/service/userService.ts
import User, { IUser } from "../models/User";
import { comparePassword } from "../utils/password";
import AppError from "../utils/appError";

export const loginUserService = async (
  email: string,
  password: string
): Promise<IUser> => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  return user;
};
