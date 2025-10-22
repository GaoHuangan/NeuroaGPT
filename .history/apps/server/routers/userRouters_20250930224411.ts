import express from "express";
import { getUser } from "../controllers/getUserController.js";
import { registerUser } from "../controllers/userRegisterController.js";
import { LoginUser } from "../controllers/userLoginController.js";
import { protect } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.get("/data", protect, getUser);
userRouter.post("/register", registerUser);
userRouter.post("/login", LoginUser);

export default userRouter;
