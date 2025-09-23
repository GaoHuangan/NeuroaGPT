// apps/server/service/userService.ts
import User, { IUser } from "../models/User";
import { hashPassword, comparePassword } from "../utils/password";
import { UserRegisterDTO } from "../dao/userRegister.dto";
import AppError from "../utils/appError";

export const registerUserService = async (data: UserRegisterDTO) => {
  const { name, email, password } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("User already exists", 409);
  }

  // 使用 utils 来加密密码
  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    credits: user.credits,
  };
};

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
