import User from "../models/User";
import AppError from "../utils/appError";
import { Request } from "express";

export const getUserService = async (req: Request) => {
  const user = await User.findOne({ email: req.body.email }).select("-password");
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return user;
};
