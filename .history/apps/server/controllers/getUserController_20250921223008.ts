// apps/server/controllers/userController.ts
import { Request, Response } from "express";

// login
export const getUserDataController = async (req: Request, res: Response) => {
    try {
        

        
        return res.status(200).json({
            success: true,
            message: "User data fetched successfully",
        });
    } catch (error: any) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
}
