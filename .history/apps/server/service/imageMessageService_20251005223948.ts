import AppError from "../utils/appError.js";
import { Request } from "express";
import Chat from "../models/Chat.js";
import { openaiService } from "../config/openai.js";
import User from "../models/User.js";


export const imageMessageService = async (req: Request) => {
    try {
        const userId = req.user._id;
        const { prompt, chatId } = req.body;

        if (!prompt || !chatId) {
            throw new AppError("Text and chatId are required", 400);
        }

        const chat = await Chat.findOne({ _id: chatId, userId }).populate("userId");

        if (!chat) {
            throw new AppError("Chat not found", 404);
        }

        chat.messages.push({
            role: "user",
            content: prompt,
            timestamp: Date.now(),
            isImage: false,
            isPublished: false,
        });

        const response = await openaiService(prompt);

        const reply = {
            role: "assistant",
            content: response,
            timestamp: Date.now(),
            isImage: false,
            isPublished: false,
        };

        chat.messages.push(reply);

        await chat.save();

        await User.updateOne({ _id: userId }, { $inc: { credits: -1 } });

        return chat;
    } catch (error: any) {
        throw new AppError(error.message || "Internal Server Error", error.statusCode || 500);
    }
};
