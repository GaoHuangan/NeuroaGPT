import { Request, Response } from "express";
import AppError from "../utils/appError.js";
import Chat from "../models/Chat.js";

export const getChat = async (req: Request, res: Response) => {
  try {
    // const chat = await Chat.find({ userId: req.user?._id });

    return res.status(200).json({
      success: true,
      data: chat,
      message: "Chat get successfully",
    });
  } catch (error: any) {
    return new AppError(error.message || "Internal Server Error", error.statusCode || 500);
  }
};
