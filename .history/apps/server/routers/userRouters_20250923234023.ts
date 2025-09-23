import express from "express";
import { getUser } from "../controllers/getUserController";
import { registerUser } from "../controllers/userRegisterController";
import { LoginUser } from "../controllers/userLoginController";
import { protect } from "../middleware/auth";

const router = express.Router();

router.get("/data", protect, getUser);
router.post("/register", registerUser);
router.post("/login", LoginUser);

export default router;
