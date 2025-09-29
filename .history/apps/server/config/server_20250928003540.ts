import mongoose from 'mongoose';
import express from "express";
import cors from "cors";
import errorHandler from "../middleware/errorMiddleware.js";
import requestLogger from "../middleware/requestLogger.js";
import logger from "../utils/logger.js";


export const connectToDB = async (): Promise<void> => {
  try {
    mongoose.connection.on("connected", async () => {
      await mongoose.connect(`${process.env.MONGO_URI}/neuroagpt`);
      logger.info("Connected to MongoDB");
    });

    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(requestLogger);
    app.use(errorHandler);

    const uri: string | undefined = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("❌ Missing required env variable: MONGO_URI");
    }

    await mongoose.connect(`${uri}/neuroagpt`);

    app.use(errorHandler);
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error(error.message);
    } else {
      logger.error("Unknown error", error);
    }
  }
};
