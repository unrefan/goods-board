import express from 'express';
import * as UserController from '../controllers/users.js';
import * as UserRequest from '../requests/users.js';
import TypeHint from '../middlewares/TypeHint.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = new express.Router();

/**
 * @swagger
 * name: Users endpoints
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Allow search users by keyword in name
 *         example: Joh
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Allow search users by keyword in email
 *         example: john-doe@
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *
 *   post:
 *     summary: Create new user, generate jwt token and login in app
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
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsIm5hbWUiOiJBbnRvbm92aWNoIiwicGhvbmUiOiIrMzgwOTg3NjU0MzIxIiwiZW1haWwiOiJhbnRvbm92aWNoMjMzNEBhbnRvbi5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCQvd0drVHNPQ3dJVGZUaDcxbmZ0RTBPZHVWWmx2TGRHZzh6Lkx6WnpBMnh1WTBuU2hqVFIyMiIsImNyZWF0ZWRBdCI6IjIwMjEtMDUtMDRUMjA6MTM6MDIuOTc3WiIsInVwZGF0ZWRBdCI6IjIwMjEtMDUtMDRUMjA6MTM6MDIuOTc5WiIsImlhdCI6MTYyMDE1OTE4Mn0.BVYH0jXcaZd9EVW7lEsDapHx461l6Rrz_h4YCnzfQ2E
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
 * /users/:id:
 *   get:
 *     summary: Retrieve a single user by ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/components/parameters/queryID'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         $ref: '#/components/responses/404NotFoundUser'
 *
 * components:
 *   parameters:
 *     queryID:
 *       in: path
 *       name: id
 *       schema:
 *         type: integer
 *         minimum: 1
 *       description: The resource's ID
 *       example: 1
 *       required: true
 *
 *   responses:
 *     401Unauthorized:
 *       description: Unauthorized or session expire
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example: {}
 *
 *     404NotFoundUser:
 *       description: The specified user was not found.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example: {"error": {"code": 404, "message": "user [1] not found"}}
 *
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         createdAt:
 *           type: datetime
 *         updatedAt:
 *           type: datetime
 *       example:
 *         id: 1
 *         name: John Doe
 *         email: john-doe@example.com
 *         phone: xxxxxxxxxx
 *         createdAt: 2021-05-01 00:00:00
 *         updatedAt: 2021-05-01 00:00:00
 */
router
  .route('/')
  .get(UserController.index)
  .post(UserRequest.create, UserController.store);

router
  .route('/:user')
  .all(TypeHint)
  .get(UserController.show);

export default router;