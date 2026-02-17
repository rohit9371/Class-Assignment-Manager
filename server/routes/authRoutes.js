import express from 'express';
import bcrypt from 'bcryptjs';
import { 
  register, 
  login, 
  logout, 
  sendVerifyOtp, 
  verifyEmail, 
  isAuthenticated, 
  sendResetOtp, 
  resetPassword 
} from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';
import Teacher from "../models/Teacher.js";
import userModel from '../models/userModel.js';

const authRouter = express.Router();

// Creating API endpoints
authRouter.post('/register', register);

// ✅ Overriding /login route to include teacher/student check
authRouter.post('/login', login);


authRouter.post('/logout', logout);
authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp);
authRouter.post('/verify-account', userAuth, verifyEmail); 
// userAuth is middleware that is used to get user_id from the cookies token
authRouter.post('/is-auth', userAuth, isAuthenticated);
authRouter.post('/send-reset-otp', sendResetOtp);
authRouter.post('/reset-pass', resetPassword);

export default authRouter

