// apps/server/service/userService.ts
import User, { IUser } from "../models/User.js";
import { hashPassword } from "../utils/password.js";
import { UserRegisterDTO } from "../dao/userRegister.dto.js";
import AppError from "../utils/appError.js";

export const registerUserService = async (inData: UserRegisterDTO) => {
  const { name, email, password } = inData;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("User already exists", 409);
  }

  // 使用 utils 来加密密码
  const hashedPassword = await hashPassword(password);

  const user: IUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return user;
};
