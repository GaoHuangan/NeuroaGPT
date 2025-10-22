import express from "express";
import { protect } from "../middleware/auth.js";
import { imageMessageController } from "../controllers/imageMessageController.js";
import { textMessageController } from "../controllers/textMessageController.js";

const MessageRouter = express.Router();

MessageRouter.get("/getTextMessage", protect, textMessageController);
MessageRouter.post("/getImageMessage", protect, imageMessageController);

export default MessageRouter;
