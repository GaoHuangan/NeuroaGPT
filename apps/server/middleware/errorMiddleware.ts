// apps/server/middleware/errorMiddleware.ts
import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError.js";
import logger from "../utils/logger.js";

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error({
    message: err.message,
    statusCode: err.statusCode,
    stack: err.stack,
    path: req.originalUrl,
    method: req.method
  });

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
};

export default errorHandler;
