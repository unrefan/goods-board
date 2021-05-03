import express from 'express';
import TypeHint from '../middlewares/TypeHint.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import * as ProductController from '../controllers/products.js';
import * as ProductRequest from '../requests/products.js';
import isMyProduct from '../middlewares/isMyProduct.js';

const router = express.Router();

router
  .route('/')
  .all(isAuthenticated)
  .get(ProductController.index)
  .post(ProductRequest.create, ProductController.create);

router
  .route('/:product')
  .all(isAuthenticated, TypeHint)
  .get(ProductController.show)
  .put(isMyProduct, ProductRequest.update, ProductController.update)
  .delete(isMyProduct, ProductController.destroy);

export default router;
