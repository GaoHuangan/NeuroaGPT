import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { connectToDB }   from './config/connectToDB.js';
import userRouter from './routers/userRouters.js';
import ChatRouter from './routers/chatRouters.js';
import messageRouter from './routers/messageRouters.js';

const app = express();

const startServer = async () => {
  await connectToDB();

  app.use(cors());
  app.use(express.json());
  app.use("/api/users", userRouter);
  app.use("/api/chat", ChatRouter);
  app.use("/api/message", messageRouter);

  app.get('/', (_req, res) => {
    res.send('<h1>server is running</h1>');
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
