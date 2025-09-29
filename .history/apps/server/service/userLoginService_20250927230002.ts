// apps/server/service/userService.ts
import User, { IUser } from "../models/User.js";
import { comparePassword } from "../utils/password";
import AppError from "../utils/appError";
import generateToken from "../utils/jwt";
import { UserLoginDTO } from "../dao/userLogin.dto";

export const loginUserService = async (inData:UserLoginDTO): Promise<{ token: string }> => {
  const { email, password } = inData;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid credentials", 401);
  }
  const token = generateToken({ id: String(user._id) });
  return { token };
};
