import mongoose from "mongoose";
import logger from "../utils/logger.js";
import { ENV } from "./db.js";

export const connectToDB = async (): Promise<void> => {
  try {
    await mongoose.connect(ENV.MONGO_URI);

    mongoose.connection.on("connected", () => {
      logger.info("✅ Connected to MongoDB");
    });

    mongoose.connection.on("error", (err) => {
      logger.error("❌ MongoDB connection error: " + err);
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error("❌ DB Connection Failed:", error.message);
    } else {
      logger.error("❌ Unknown DB Error:", error);
    }
    process.exit(1);
  }
};
