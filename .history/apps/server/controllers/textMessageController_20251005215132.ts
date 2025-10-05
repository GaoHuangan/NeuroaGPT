import { Request, Response } from "express";
import { textMessageService } from "../service/textMessageService.js";
import AppError from "../utils/appError.js";

export const textMessageController = async (req: Request, res: Response) => {
  try {
    const chat = await textMessageService(req);

    return res.status(200).json({
      success: true,
      chat,
    });
  } catch (error: any) {
    return new AppError(error.message || "Internal Server Error", error.statusCode || 500);
  }
};
