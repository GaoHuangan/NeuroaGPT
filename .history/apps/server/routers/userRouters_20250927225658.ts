import express from "express";
import { getUser } from "../controllers/getUserController.js";
import { registerUser } from "../controllers/userRegisterController.js";
import { LoginUser } from "../controllers/userLoginController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/data", protect, getUser);
router.post("/register", registerUser);
router.post("/login", LoginUser);

export default router;
