import AppError from "../utils/appError.js";
import { Request, Response } from "express";
import Chat from "../models/Chat.js";

/**
 * Service to delete a chat by ID
 * - Validates request body
 * - Deletes chat from database
 * - Returns success response if deletion is successful
 */
export const deleteChatService = async (req: Request, res: Response) => {
    try {
        // Extract chat ID from request body
        const { id } = req.body;

        // Validate: chat ID must be provided
        if (!id) {
            throw new AppError("Chat ID is required", 400);
        }

        // Attempt to delete chat with the given ID
        const result = await Chat.deleteOne({ _id: id });

        // If no document was deleted, throw 404 error
        if (result.deletedCount === 0) {
            throw new AppError("Chat not found", 404);
        }

        // Respond with success if chat was deleted
        return res.status(200).json({
            success: true,
            message: "Chat deleted successfully",
        });
    } catch (error: any) {
        // Pass error to Express error handler
        throw new AppError(
            error.message || "Internal Server Error",
            error.statusCode || 500
        );
    }
};
