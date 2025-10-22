import AppError from "../utils/appError.js";
import { Request } from "express";
import Chat from "../models/Chat.js";
import { openaiService } from "../config/openai.js";
import User from "../models/User.js";

/**
 * Handles text message processing in a chat.
 * Steps:
 * 1. Validate input (prompt and chatId)
 * 2. Verify chat belongs to the user
 * 3. Save user message
 * 4. Get assistant reply via OpenAI/Gemini
 * 5. Save assistant reply
 * 6. Deduct user credits
 */
export const textMessageService = async (req: Request) => {
    try {
        // Get current user ID from request (assumes authentication middleware added `req.user`)
        const userId = req.user._id;
        const { prompt, chatId } = req.body;

        // Input validation
        if (!prompt || !chatId) {
            throw new AppError("Text and chatId are required", 400);
        }

        if (req.user.credits < 2) {
            throw new AppError("Not enough credits", 400);
        }

        // Ensure the chat exists and belongs to the user
        // ❌ Original bug: Chat.findById({ userId, _id: chatId }) is invalid.
        // ✅ Correct: use findOne with both conditions.
        const chat = await Chat.findOne({ _id: chatId, userId }).populate("userId");

        if (!chat) {
            throw new AppError("Chat not found", 404);
        }

        // Add user's message to chat
        chat.messages.push({
            role: "user",
            content: prompt,
            timestamp: Date.now(),
            isImage: false,
            isPublished: false,
        });

        // Get AI response from OpenAI/Gemini service
        const response = await openaiService(prompt);

        // Add assistant's reply
        const reply = {
            role: "assistant",
            content: response,
            timestamp: Date.now(),
            isImage: false,
            isPublished: false,
        };

        chat.messages.push(reply);

        // Save chat with both user + assistant messages
        await chat.save();

        // Deduct user credits by 1 per message
        await User.updateOne({ _id: userId }, { $inc: { credits: -1 } });

        return chat;
    } catch (error: any) {
        // Catch all errors and wrap with AppError
        throw new AppError(error.message || "Internal Server Error", error.statusCode || 500);
    }
};
