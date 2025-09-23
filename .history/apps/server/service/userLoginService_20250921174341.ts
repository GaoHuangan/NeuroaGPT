// apps/server/service/userService.ts
import User, { IUser } from "../models/User";
import { comparePassword } from "../utils/password";
import AppError from "../utils/appError";
import generateToken from "../utils/jwt";

export const loginUserService = async (
  email: string,
  password: string
): Promise<{ token: string }> => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid credentials", 401);
  }
  const token = generateToken(user.id);
  return { token };
};
