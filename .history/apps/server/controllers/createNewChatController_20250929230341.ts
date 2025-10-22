import { Request, Response } from "express";
import AppError from "../utils/appError.js";
import { createNewChatService } from "../service/createNewChatService.js";

export const createNewChat = async (req: Request, res: Response) => {
  try {
    const chat = await createNewChatService(req, res);

    return res.status(200).json({
      success: true,
      data: chat,
      message: "Chat created successfully",
    });
  } catch (error: any) {
    return new AppError(error.message || "Internal Server Error", error.statusCode || 500);
  }
};
