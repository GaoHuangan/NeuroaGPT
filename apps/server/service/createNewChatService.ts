import AppError from "../utils/appError.js";
import { Request, Response } from "express";
import Chat from "../models/Chat.js";

/**
 * Service to create a new chat for the logged-in user
 * - Requires `req.user._id` and optionally `req.user.name`
 * - Creates a new chat document with default name and empty messages
 */
export const createNewChatService = async (req: Request, res: Response) => {
    try {
        // Extract user details from request (set by auth middleware)
        const userId = req.user?._id;
        const userName = req.user?.name;

        // Validate: must have userId
        if (!userId) {
            throw new AppError("User ID not found", 404);
        }

        // Create a new chat document
        const chat = await Chat.create({
            userId: userId,
            userName: userName || "Unknown User", // fallback if name missing
            name: "New Chat",                      // default chat name
            messages: [],                          // start with no messages
        });

        // Respond with the created chat
        return res.status(201).json({
            success: true,
            data: chat,
            message: "New chat created successfully",
        });
    } catch (error: any) {
        // Pass error to error-handling middleware
        throw new AppError(
            error.message || "Internal Server Error",
            error.statusCode || 500
        );
    }
};
