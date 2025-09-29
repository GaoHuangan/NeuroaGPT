// apps/server/controllers/userController.ts
import { Request, Response } from "express";
import { loginUserService } from "../service/userLoginService.js";
import { UserLoginDTO } from "../dao/userLogin.dto";

// login
export const LoginUser = async (req: Request, res: Response) => {
    try {
        const inData = req.body as UserLoginDTO;
        const result = await loginUserService(inData);
        
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token: result.token,
        });
    } catch (error: any) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
}
