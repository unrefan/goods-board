import express from 'express';
import * as auth from '../controllers/auth.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.post('/sessions', auth.login);
router.get('/logout', auth.logout);
router.get('/me', isAuthenticated, auth.me);
router.put('/me', isAuthenticated, auth.update);

export default router;