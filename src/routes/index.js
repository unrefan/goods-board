import express from 'express';
import userRoutes from './users.js';
import authRoutes from './auth.js';

const router = express.Router();

router.use('/', authRoutes);
router.use('/users', userRoutes);

export default router;