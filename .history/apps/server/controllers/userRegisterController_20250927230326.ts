// apps/server/controllers/userController.ts
import { Request, Response } from "express";
import { registerUserService } from "../service/userRegisterService.js";
import { UserRegisterDTO } from "../dao/userRegister.dto";
import logger from "../utils/logger.js";  // ✅ 引入日志工具

export const registerUser = async (req: Request, res: Response) => {
  try {
    const data = req.body as UserRegisterDTO;

    // ✅ 打印输入数据（可以选择性屏蔽敏感信息）
    logger.info("Incoming register request", { body: data });

    const result = await registerUserService(data);

    // ✅ 打印成功日志
    logger.info("User registered successfully", { user: result });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      ...result,
    });
  } catch (error: any) {
    // ✅ 打印错误日志
    logger.error("Error during user registration", {
      error: error.message,
      stack: error.stack,
    });

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
