// routes/adminUsers.js
import express from 'express';
import { getAllUsers, updateUserRole } from '../controllers/adminUserController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = express.Router();

// Get all users
router.get('/', authMiddleware, adminMiddleware, getAllUsers);

// Update user role
router.put('/:userId/role', authMiddleware, adminMiddleware, updateUserRole);

export default router;
