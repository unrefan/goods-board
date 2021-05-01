import express from 'express';
import * as UserController from '../controllers/users.js';
import TypeHint from '../middlewares/TypeHint.js';

const router = new express.Router();

router
  .route('/')
  .get(UserController.index)
  .post(UserController.store);

router
  .route('/:user')
  .all(TypeHint)
  .get(UserController.show)
  .put(UserController.update)
  .delete(UserController.destroy);

export default router;