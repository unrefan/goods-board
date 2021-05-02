import express from 'express';
import * as UserController from '../controllers/users.js';
import * as UserRequest from '../requests/users.js';
import TypeHint from '../middlewares/TypeHint.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = new express.Router();

router
  .route('/')
  .get(isAuthenticated, UserController.index)
  .post(UserRequest.create, UserController.store);

router
  .route('/:user')
  .all(isAuthenticated, TypeHint)
  .get(UserController.show)
  .put(UserRequest.update, UserController.update)
  .delete(UserController.destroy);

export default router;