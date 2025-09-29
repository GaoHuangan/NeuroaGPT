import express from "express";
import { createNewChatController } from "../controllers/createNewChatController.js";
import { getChatController } from "../controllers/getChatController.js";
import { deleteChatController } from "../controllers/deleteChatController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/getChat", protect, getChatController);
router.post("/createNewChat", protect, createNewChatController);
router.delete("/deleteChat", protect, deleteChatController);

export default router;
