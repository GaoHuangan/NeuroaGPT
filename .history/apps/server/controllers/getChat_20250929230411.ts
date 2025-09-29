import { Request, Response } from "express";
import AppError from "../utils/appError.js";
import { getChatService } from "../service/getChatService.js";

export const getChat = async (req: Request, res: Response) => {
  try {
    const chat = await getChatService(req, res);
    if (!chat) {
      throw new AppError("Chat not found", 404);
    }
    return res.status(200).json({
      success: true,
      data: chat,
      message: "Chat get successfully",
    });
  } catch (error: any) {
    return new AppError(error.message || "Internal Server Error", error.statusCode || 500);
  }
};
