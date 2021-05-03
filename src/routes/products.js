import express from 'express';
import TypeHint from '../middlewares/TypeHint.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import * as ProductController from '../controllers/products.js';
import * as ProductRequest from '../requests/products.js';

const router = express.Router();

router
  .route('/')
  .all(isAuthenticated)
  .get(ProductController.index)
  .post(ProductRequest.create, ProductController.create);

router
  .route('/:product')
  .all(TypeHint, isAuthenticated)
  .get(ProductController.show)
  .put(ProductRequest.update, ProductController.update)
  .delete(ProductController.destroy);

export default router;
