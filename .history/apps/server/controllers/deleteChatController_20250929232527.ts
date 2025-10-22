// controllers/deleteChatController.ts
import { Request, Response, NextFunction } from "express";
import { deleteChatService } from "../service/deleteChatService.js";
import AppError from "../utils/appError.js";

/**
 * Controller for deleting chat
 */
export const deleteChat = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.body;
        await deleteChatService(id);

        return res.status(200).json({
            success: true,
            message: "Chat deleted successfully",
        });
    } catch (error: any) {
        next(new AppError(error.message || "Internal Server Error", error.statusCode || 500));
    }
};
