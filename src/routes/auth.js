import express from 'express';
import * as auth from '../controllers/auth.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import {updateCurrent} from '../requests/users.js';

const router = express.Router();

/**
 * @swagger
 * /sessions:
 *   post:
 *     summary: Authorize an user to application via session
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: password
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *
 *       422:
 *         description: Unprocessable entity
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   field:
 *                     type: string
 *                     example: email
 *                   message:
 *                     type: string
 *                     example: Requested user does not exists.
 * /logout:
 *   get:
 *     summary: Log out user
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *
 * /me:
 *   get:
 *     summary: Get current logged user profile
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 *
 *   put:
 *     summary: Update current logged user profile
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 nullable: true
 *               email:
 *                 type: string
 *                 nullable: true
 *               phone:
 *                 type: string
 *                 nullable: true
 *               currentPassword:
 *                 type: string
 *                 nullable: true
 *               newPassword:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       202:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       422:
 *         description: Unprocessable entity
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   field:
 *                     type: string
 *                     example: name
 *                   message:
 *                     type: string
 *                     example: The name must be at least 3 characters.
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 *
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: connect.sid
 *
 * security:
 *   - apiKey: []
 * */
router.post('/sessions', auth.loginJWT);
router.get('/logout', auth.logout);
router.post('/login', auth.login);
router.post('/register', auth.register);
router.get('/me', isAuthenticated, auth.me);
router.put('/me', isAuthenticated, updateCurrent, auth.update);

export default router;