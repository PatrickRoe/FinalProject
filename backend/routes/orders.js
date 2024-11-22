// routes/orders.js

import express from 'express';
import {
  createOrder,
  getUserOrders,
  requestOrderCancellation,
  // ... other controller functions ...
} from '../controllers/orderController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createOrder);
router.get('/', authMiddleware, getUserOrders);
router.post('/:id/cancel', authMiddleware, requestOrderCancellation); // New route

export default router;
