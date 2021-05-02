import express from 'express';
import userRoutes from './users.js';
import * as auth from '../controllers/auth.js';

const router = express.Router();

router.post('/sessions', auth.login);
router.use('/users', userRoutes);

export default router;