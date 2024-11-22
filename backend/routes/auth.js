// routes/auth.js

import express from "express";
import {
  signup,
  login,
  getProfile,
  updateProfile,
  refreshAccessToken,
  logout,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/signup",
  [
    body("fullName").notEmpty().withMessage("Full name is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  signup
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").exists().withMessage("Password is required"),
  ],
  login
);

router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);

// Refresh Access Token
router.post("/refresh-token", refreshAccessToken);

// User Logout
router.post("/logout", authMiddleware, logout);

export default router;
