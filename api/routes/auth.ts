import express from "express";

import {
  getCurrentUser,
  logIn,
  logOut,
  signUp,
} from "../controllers/authController";

const router = express.Router();

router.get("/me", getCurrentUser);

router.post("/log-in", logIn);

router.post("/logout", logOut);

router.post("/sign-up", signUp);

export default router;
