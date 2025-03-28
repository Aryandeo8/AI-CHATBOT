import { Router } from 'express';
import {
  loginUser,
  registerUser,
  refreshAccessToken,
  getCurrentUser,
  googleCallback
} from '../controllers/user.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import passport from 'passport';

const userRouter = Router();

userRouter.route("/login").post(loginUser);
userRouter.route("/register").post(registerUser); // Add a separate register route
userRouter.route("/refresh-token").post(refreshAccessToken);
userRouter.route("/current-user").get(verifyJWT, getCurrentUser);
userRouter.route("/auth/google").get(passport.authenticate("google", {
  scope: ["profile", "email"],
  session: false
}));

userRouter.route("/auth/google/callback").get(passport.authenticate("google", {
  failureRedirect: "/login",
  session: false
}), googleCallback);

export default userRouter;
