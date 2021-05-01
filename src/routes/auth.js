import express from 'express';
import * as auth from '../controllers/auth.js';

const router = express.Router();

router.post('/sessions', auth.login);
router.post('/sessions', auth.login);

export default router;