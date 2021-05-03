import express from 'express';
import userRoutes from './users.js';
import authRoutes from './auth.js';
import productRoutes from './products.js';

const router = express.Router();

router.use('/', authRoutes);
router.use('/users', userRoutes);
router.use('/items', productRoutes);

export default router;