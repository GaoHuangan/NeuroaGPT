import AppError from "../utils/appError.js";
import { Request, Response } from "express";
import Chat from "../models/Chat.js";

export const getChatService = async (req: Request, res: Response) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            throw new AppError("User not found", 404);
        }
        const chats = await Chat.find({ userId }).sort({ createdAt: -1 });
        if (!chats) {
            throw new AppError("Chat not found", 404);
        }
        return res.status(200).json({
            success: true,
            data: chats,
            message: "Chat get successfully",
        });
    } catch (error: any) {
        return new AppError(error.message || "Internal Server Error", error.statusCode || 500);
    }
};
