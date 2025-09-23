import { Request, Response } from "express";
import { getUserService } from "../service/getUserService";

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId; // 从中间件里拿到的
    const user = await getUserService(userId);

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error: any) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
