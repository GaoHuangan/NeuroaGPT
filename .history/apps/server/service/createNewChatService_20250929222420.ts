import AppError from "../utils/appError.js";
import { Request } from "express";
import Chat from "../models/Chat.js";

export const createNewChatService = async (req: Request) => {
    try {
        const userId = req.user?._id;
        const userName = req.user?.name;
        if (!userId) {
            throw new AppError("createNewChatService UserId not found", 404);
        }
        const chat = await Chat.create({
            userId: userId,
            userName: userName,
            name: "New Chat",
            messages: [],
        });
        return chat;
    } catch (error) {
        throw new AppError("createNewChatService error", 500);
    }
};
