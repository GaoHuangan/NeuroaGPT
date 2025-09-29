// apps/server/service/userService.ts
import User, { IUser } from "../models/User.js";
import { comparePassword } from "../utils/password.js";
import AppError from "../utils/appError.js";
import generateToken from "../utils/jwt.js";
import { UserLoginDTO } from "../dao/userLogin.dto.js";
import logger from "../utils/logger.js";

export const loginUserService = async (inData:UserLoginDTO): Promise<{ token: string }> => {
  const { email, password } = inData;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new AppError("Invalid credentials", 401);
    logger.info("User not found", { user });
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid credentials", 401);
    logger.info("User password not matched", { user });
  }
  const token = generateToken({ id: String(user._id) });
  logger.info("User logged in successfully", { user });
  return { token };
};
