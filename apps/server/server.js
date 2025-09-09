import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { connectToDB } from './config/server.js';

const app = express();

const startServer = async () => {
  await connectToDB();

  app.use(cors());
  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('<h1>server is running</h1>');
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
  });
};

startServer();
