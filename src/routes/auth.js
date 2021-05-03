import express from 'express';
import * as auth from '../controllers/auth.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import {updateCurrent} from '../requests/users.js';

const router = express.Router();

router.post('/sessions', auth.login);
router.get('/logout', auth.logout);
router.get('/me', isAuthenticated, auth.me);
router.put('/me', isAuthenticated, updateCurrent, auth.update);

export default router;