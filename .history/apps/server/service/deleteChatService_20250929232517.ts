// service/deleteChatService.ts
import AppError from "../utils/appError.js";
import Chat from "../models/Chat.js";

/**
 * Service to delete a chat by ID
 * - Validates input ID
 * - Deletes chat from database
 * - Returns plain result (no res/json)
 */
export const deleteChatService = async (id: string) => {
    if (!id) {
        throw new AppError("Chat ID is required", 400);
    }

    const result = await Chat.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
        throw new AppError("Chat not found", 404);
    }

    // Return success info back to controller
    return { deleted: true };
};
