// apps/server/config/db.ts
import dotenv from "dotenv";
import AppError from "../utils/appError.js";

dotenv.config();

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new AppError(`❌ Missing required env variable: ${name}`, 500);
  }
  return value;
}

export const ENV = {
  MONGO_URI: getEnv("MONGO_URI"),
  JWT_SECRET: getEnv("JWT_SECRET"),   
  PORT: process.env.PORT || "5000",   
};
