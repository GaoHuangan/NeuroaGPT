import { Request, Response } from "express";
import Chat from "../models/Chat.js";

export const createNewChatService = async (req: Request, res: Response) => {
    try {
        const userId = req.user?._id;
        const userName = req.user?.name;
        if (!userId) {
            return res.status(404).json({
                success: false,
                message: "createNewChatService UserId not found",
            });
        }
        const chat = await Chat.create({
            userId: userId,
            userName: userName,
            name: "New Chat",
            messages: [],
        });

        return res.status(200).json({
            success: true,
            data: chat,
            message: "createNewChatService success",
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
