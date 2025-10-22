import { Request, Response } from "express";
import AppError from "../utils/appError.js";

export const createNewChat = async (req: Request, res: Response) => {
  try {
    // const user = await getUserService(req);

    return res.status(200).json({
      success: true,
      message: "Chat created successfully",
    });
  } catch (error: any) {
    return new AppError(error.message || "Internal Server Error", error.statusCode || 500);
  }
};
