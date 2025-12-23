import express from "express";
import { addToUserHistory, adminLogin, deleteUserHistory, getUserHistory, loginUser, registerUser, userCredit } from "../controllers/userController.js";
import userAuth from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/credits", userAuth, userCredit);
userRouter.post('/admin',adminLogin)
userRouter.post("/add-history", userAuth, addToUserHistory);
// Change from .get to .post if you want to send userId in the body
userRouter.post("/get-history", userAuth, getUserHistory);
// Add this to your existing userRouter.js
userRouter.post("/delete-history", userAuth, deleteUserHistory);

export default userRouter;
