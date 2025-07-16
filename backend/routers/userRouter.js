import express from 'express';
import authUser from "../middleware/authUser.js";
import { getUserData, loginUser, registerUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/signup', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/profile', authUser, getUserData);

export default userRouter;