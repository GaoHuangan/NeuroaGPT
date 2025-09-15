// apps/server/controllers/userController.ts
import { Request, Response } from "express";
import { loginUserService } from "../service/userLoginServece.js";
import { UserLoginDTO } from "../dao/userLogin.dto.js";

// login
export const LoginUser = async (req: Request, res: Response) => {
    try {
        const data = req.body as UserLoginDTO;
        const result = await loginUserService(data.email, data.password);
        
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            ...result,
        });
    } catch (error: any) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
}
