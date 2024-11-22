// routes/adminOrders.js
import express from 'express';
import {
  getAllOrders,
  updateOrderStatus,
  exportOrders,
} from '../controllers/adminOrderController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = express.Router();

// Get all orders
router.get('/', authMiddleware, adminMiddleware, getAllOrders);

// Update order status
router.put('/:orderId/status', authMiddleware, adminMiddleware, updateOrderStatus);

// Export orders data
router.get('/export', authMiddleware, adminMiddleware, exportOrders);

export default router;
