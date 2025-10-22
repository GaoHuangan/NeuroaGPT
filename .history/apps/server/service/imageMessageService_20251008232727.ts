import AppError from "../utils/appError.js";
import { Request } from "express";
import Chat from "../models/Chat.js";
import axios from "axios";
import imagekit from "../config/imageAi.js";
import ImageKit from '@imagekit/nodejs';


export const imageMessageService = async (req: Request) => {
    try {
        const userId = req.user._id;
        const { prompt, chatId, isPublished } = req.body;


        if (req.user.credits < 2) {
            return { success: false, message: "Not enough credits" };
        }
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
            isImage: true,
            isPublished: isPublished,
        });

        const encodePrompt = encodeURIComponent(prompt);
        const generatedImageUrl = `${process.env.IMAGE_PUBLIC_KEY}/
        ik-genimg-prompt-${encodePrompt}/Neuroagpt/${Date.now}.png?tw=w-800,h-800`;
        // Trigger generate by fething from Imagekit
        const generateImageByAi = await axios.get(generatedImageUrl,{responseType: "arraybuffer"})
        
        // convert to base64
        const base64Image = `data:image/png;base64,${Buffer.from(generateImageByAi.data,"binary").toString("base64")}`

        // upload to base64
        const uploadResponse = await imagekit({
            file: base64Image,
            fileName:`${Date.now()}.png`,
            floder:"NeuroaAI"
        })

    } catch (error: any) {
        throw new AppError(error.message || "Internal Server Error", error.statusCode || 500);
    }
};
