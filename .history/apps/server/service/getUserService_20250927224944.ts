import AppError from "../utils/appError.js";
import { Request } from "express";

export const getUserService = async (req: Request) => {
  const user = req.user;
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return user;
};
