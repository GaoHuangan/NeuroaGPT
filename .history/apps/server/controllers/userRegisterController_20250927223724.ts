// apps/server/controllers/userController.ts
import { Request, Response } from "express";
import { registerUserService } from "../service/userRegisterService";
import { UserRegisterDTO } from "../dao/userRegister.dto";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const data = req.body as UserRegisterDTO;
    const result = await registerUserService(data);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      ...result,
    });
  } catch (error: any) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
