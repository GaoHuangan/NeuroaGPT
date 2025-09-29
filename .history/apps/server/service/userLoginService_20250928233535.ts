// apps/server/service/userLoginService.ts
import User, { IUser } from "../models/User.js";
import { comparePassword } from "../utils/password.js";
import AppError from "../utils/appError.js";
import generateToken from "../utils/jwt.js";
import { UserLoginDTO } from "../dao/userLogin.dto.js";
import logger from "../utils/logger.js";

// ✅ 定义一个带 password 的类型（专门用于登录）
type IUserWithPassword = IUser & { password: string };

export const loginUserService = async (
  inData: UserLoginDTO
): Promise<{ token: string }> => {
  const { email, password } = inData;

  // 🔍 查询用户，并显式断言为 IUserWithPassword
  const user = (await User.findOne({ email })
    .select("+password")) as IUserWithPassword | null;

  if (!user) {
    logger.warn(`❌ Login failed: user not found for email=${email}`);
    throw new AppError("User not found", 401);
  }

  // 🔑 校验密码
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    logger.warn(`❌ Login failed: wrong password for email=${email}`);
    throw new AppError("Invalid password", 401);
  }

  // 🔐 生成 JWT
  const token = generateToken({ id: String(user._id) });
  logger.info(`✅ User logged in successfully: email=${email}, id=${user._id}`);

  return { token };
};
