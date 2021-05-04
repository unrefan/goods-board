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
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 *
 *   post:
 *     summary: Create new user and login in app
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
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
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
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 *
 *   delete:
 *     summary: Delete a user by ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/components/parameters/queryID'
 *     responses:
 *       204:
 *         description: No content
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         $ref: '#/components/responses/404NotFoundUser'
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
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
  .get(isAuthenticated, UserController.index)
  .post(UserRequest.create, UserController.store);

router
  .route('/:user')
  .all(isAuthenticated, TypeHint)
  .get(UserController.show)
  .delete(UserController.destroy);

export default router;