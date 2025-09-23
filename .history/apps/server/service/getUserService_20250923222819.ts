import AppError from "../utils/appError";
import { Request } from "express";

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const getUserService = async (req: AuthenticatedRequest) => {
  const user = req.user;
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return user;
};
