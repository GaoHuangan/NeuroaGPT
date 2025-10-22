import express from "express";
import cors from "cors";
import { connectToDB } from "./connectToDB.js";
import { ENV } from "./db.js";
import errorHandler from "../middleware/errorMiddleware.js";
import requestLogger from "../middleware/requestLogger.js";
import userRouter from "../routers/userRouters.js";
import chatRouter from "../routers/chatRouters.js";
import messageRouter from "../routers/messageRouters.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Routes
app.use("/api/message", messageRouter);
app.use("/api/users", userRouter);
app.use("/api/chat", chatRouter);

app.get("/", (_req, res) => {
  res.send("🚀 API is running");
});

// Error handler
app.use(errorHandler);

const PORT = ENV.PORT || 3000;

connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
});
