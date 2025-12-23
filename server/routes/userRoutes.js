import express from "express";
import { adminLogin, loginUser, registerUser, userCredit } from "../controllers/userController.js";
import userAuth from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/credits", userAuth, userCredit);
userRouter.post('/admin',adminLogin)


export default userRouter;
