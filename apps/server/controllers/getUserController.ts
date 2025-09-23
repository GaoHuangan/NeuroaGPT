import { Request, Response } from "express";
import { getUserService } from "../service/getUserService";
import AppError from "../utils/appError";

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await getUserService(req);

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error: any) {
    return new AppError(error.message || "Internal Server Error", error.statusCode || 500);
  }
};
