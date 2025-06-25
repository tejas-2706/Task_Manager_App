import express from 'express'
import {SignupUser, loginUser, logoutUser} from '../controllers/userController.js'
import { userAuthVerification } from '../middleware/auth-middleware.js';

const userRouter = express.Router();

userRouter.post('/signup', SignupUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);
userRouter.post('/auth', userAuthVerification);

export default userRouter
