import AppError from "../utils/appError.js";
import { Request, text } from "express";
import Chat from "../models/Chat.js";

export const textMessageService = async (req: Request) => {
    try {
        const userId = req.user._id;
        const { prompt, chatId } = req.body;

        if (!prompt || !chatId) {
            throw new AppError("Text and chatId are required", 400);
        }
        const chat = await Chat.findById({userId,_id:chatId});

        if (!chat) {
            throw new AppError("Chat not found", 404);
        }

        chat.messages.push(
            {role:"user",
                content:prompt,
                timestamp:Date.now(),
                isImage:false,
                isPublished:false,
            }
        )
        await chat.save();
        return chat;
    } catch (error) {
        
    }
};
