// apps/server/service/userService.ts
import jwt from "jsonwebtoken";
import User from "../models/User";
import { comparePassword } from "../utils/password";
import AppError from "../utils/appError";

type LoginResult = {
  id: any;
  name: string;
  email: string;
  credits: number;
  token: string;
};

export const loginUserService = async (
  email: string,
  password: string
): Promise<LoginResult> => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new AppError("JWT secret not configured", 500);
  }

  const token = jwt.sign(
    { userId: user._id.toString() },
    secret,
    { expiresIn: "7d" }
  );

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    credits: user.credits,
    token,
  };
};
