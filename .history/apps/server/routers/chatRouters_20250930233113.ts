import express from "express";
import { createNewChatController } from "../controllers/createNewChatController.js";
import { getChatController } from "../controllers/getChatController.js";
import { deleteChatController } from "../controllers/deleteChatController.js";
import { protect } from "../middleware/auth.js";

const ChatRouter = express.Router();

ChatRouter.get("/getChat", protect, getChatController);
ChatRouter.get("/createNewChat", protect, createNewChatController);
ChatRouter.post("/deleteChat", protect, deleteChatController);

export default ChatRouter;
