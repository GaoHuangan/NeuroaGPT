import AppError from "../utils/appError.js";
import { Request, Response } from "express";
import Chat from "../models/Chat.js";

/**
 * Service to get all chats for the logged-in user
 * - Requires `req.user._id` (set by authentication middleware)
 * - Returns chats sorted by creation date (newest first)
 */
export const getChatService = async (req: Request, res: Response) => {
    try {
        // Extract the user ID from request (injected by auth middleware)
        const userId = req.user?._id;

        // Validate: user must exist
        if (!userId) {
            throw new AppError("User not found", 404);
        }

        // Find all chats for this user, sorted by newest first
        const chats = await Chat.find({ userId }).sort({ createdAt: -1 });

        // If no chats found, return a 404 error
        if (chats.length === 0) {
            throw new AppError("No chats found", 404);
        }

        // Success: return chats in response
        return res.status(200).json({
            success: true,
            data: chats,
            message: "Chats retrieved successfully",
        });
    } catch (error: any) {
        // Throw error to be handled by global error handler middleware
        throw new AppError(
            error.message || "Internal Server Error",
            error.statusCode || 500
        );
    }
};
