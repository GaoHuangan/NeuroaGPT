import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError.js";
import { deleteChatService } from "../service/deleteChatService.js";

/**
 * Controller for deleting a chat
 * - Calls the deleteChatService to handle database logic
 * - Returns JSON response to client
 * - Passes errors to global error handler middleware
 */
export const deleteChat = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Call service layer to delete chat
    await deleteChatService(req, res);

    // Send success response
    return res.status(200).json({
      success: true,
      message: "Chat deleted successfully",
    });
  } catch (error: any) {
    // Forward error to error-handling middleware
    next(new AppError(error.message || "Internal Server Error", error.statusCode || 500));
  }
};
