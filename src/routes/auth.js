import express from 'express';
import * as auth from '../controllers/auth.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import {updateCurrent} from '../requests/users.js';

const router = express.Router();

/**
 * @swagger
 * /sessions:
 *   post:
 *     summary: Authorize an user to application and generate json web token
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
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsIm5hbWUiOiJBbnRvbm92aWNoIiwicGhvbmUiOiIrMzgwOTg3NjU0MzIxIiwiZW1haWwiOiJhbnRvbm92aWNoMjMzNEBhbnRvbi5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCQvd0drVHNPQ3dJVGZUaDcxbmZ0RTBPZHVWWmx2TGRHZzh6Lkx6WnpBMnh1WTBuU2hqVFIyMiIsImNyZWF0ZWRBdCI6IjIwMjEtMDUtMDRUMjA6MTM6MDIuOTc3WiIsInVwZGF0ZWRBdCI6IjIwMjEtMDUtMDRUMjA6MTM6MDIuOTc5WiIsImlhdCI6MTYyMDE1OTE4Mn0.BVYH0jXcaZd9EVW7lEsDapHx461l6Rrz_h4YCnzfQ2E
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
 *
 * /login:
 *   post:
 *     summary: Authorize an user to application and establish cookie session
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
 *
 * /register:
 *   post:
 *     summary: Create new user and his session then login in app
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *               email:
 *                 type: string
 *                 required: true
 *               phone:
 *                 type: string
 *                 nullable: true
 *               password:
 *                 type: string
 *                 required: true
 *     responses:
 *       201:
 *         description: Created
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
 *               example: [{"field": "name", "message": "The name must be at least 3 characters."}]
 *
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
 *       - bearerAuth: []
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
 *       - bearerAuth: []
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
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * */
router.post('/sessions', auth.loginJWT);
router.get('/logout', auth.logout);
router.post('/login', auth.login);
router.post('/register', auth.register);
router.get('/me', isAuthenticated, auth.me);
router.put('/me', isAuthenticated, updateCurrent, auth.update);

export default router;