import { Request, Response, NextFunction } from "express";
import { imageMessageService } from "../service/imageMessageService.js";
import AppError from "../utils/appError.js";

/**
 * Controller: handles incoming chat image requests
 * 1. Calls service to process chat
 * 2. Returns updated chat data
 * 3. Properly propagates or responds to errors
 */
export const imageMessageController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Call the service layer
    const chat = await imageMessageService(req);

    // Good practice: respond with a clear data structure
    return res.status(200).json({
      success: true,
      data: chat, // wrap data under a "data" key instead of spreading
    });
  } catch (error: any) {
    // Pass the error to centralized error-handling middleware
    next(new AppError(error.message || "Internal Server Error", error.statusCode || 500));
  }
};
