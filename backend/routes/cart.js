// routes/cart.js
import express from "express";
const router = express.Router();
import {
  getCart,
  addToCart,
  removeFromCart,
  applyDiscount,
} from "../controllers/cartController.js";
import authMiddleware from "../middleware/authMiddleware.js";

router.get("/", authMiddleware, getCart);
router.post("/add", authMiddleware, addToCart);
router.post("/remove", authMiddleware, removeFromCart);
router.post("/apply-discount", authMiddleware, applyDiscount);

export default router;
