// apps/server/utils/logger.ts
import { createLogger, format, transports } from "winston";

const { combine, timestamp, errors, json, colorize, simple } = format;

const logger = createLogger({
  level: "info", // 默认日志级别
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), errors({ stack: true }), json()),
  transports: [
    // 错误日志（只记录 error 级别）
    new transports.File({ filename: "logs/error.log", level: "error" }),

    // 业务日志（记录所有级别）
    new transports.File({ filename: "logs/combined.log" }),

    // 请求日志（专门存放 http 请求）
    new transports.File({ filename: "logs/request.log", level: "http" })
  ]
});

// 开发环境额外输出到控制台
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: combine(colorize(), simple())
    })
  );
}

export default logger;
