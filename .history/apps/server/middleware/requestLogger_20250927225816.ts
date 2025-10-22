// apps/server/middleware/requestLogger.ts
import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger.js";

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  logger.http({
    message: "Incoming request",
    method: req.method,
    url: req.originalUrl,
    ip: req.ip
  });
  next();
};

export default requestLogger;
