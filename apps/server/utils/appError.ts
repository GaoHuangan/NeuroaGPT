// apps/server/utils/appError.ts

export default class AppError extends Error {
    success: boolean;
    statusCode: number;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
      this.success = false;
  
      // 保留原始错误堆栈信息（更利于调试）
      Error.captureStackTrace(this, this.constructor);
    }
  }
  