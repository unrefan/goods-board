import express from 'express';
import TypeHint from '../middlewares/TypeHint.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import * as ProductController from '../controllers/products.js';
import * as ProductRequest from '../requests/products.js';
import isMyProduct from '../middlewares/isMyProduct.js';
import * as ProductImagesController from '../controllers/productImages.js';

const router = express.Router();

/**
 * @swagger
 * name: Products endpoints
 * /items:
 *   get:
 *     summary: Retrieve a list of product
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         example: Note
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         example: 1
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *           enum:
 *             - price
 *             - createdAt
 *         default: createdAt
 *       - in: query
 *         name: orderType
 *         schema:
 *           type: string
 *           enum:
 *             - asc
 *             - desc
 *         default: desc
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 *
 *   post:
 *     summary: Create new product
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               price:
 *                 type: integer
 *             example:
 *               title: 'Notebook'
 *               price: 100.00
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       422:
 *         description: Unprocessable entity
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 example: [{"field": "title", "message": "The title must be at least 3 characters."}]
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 *
 * /items/:id:
 *   get:
 *     summary: Retrieve a single product by ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/components/parameters/queryID'
 *     responses:
 *       200:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         $ref: '#/components/responses/404NotFoundProduct'
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 *
 *   put:
 *     summary: Update requested product
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 nullable: true
 *               price:
 *                 type: integer
 *                 nullable: true
 *     responses:
 *       202:
 *         description: Updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       422:
 *         description: Unprocessable entity
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 example: [{"field": "title", "message": "The title must be at least 3 characters."}]
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 *       403:
 *         $ref: '#/components/responses/403Forbidden'
 *
 *   delete:
 *     summary: Delete a product by ID
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
 *         $ref: '#/components/responses/404NotFoundProduct'
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 *       403:
 *         $ref: '#/components/responses/403Forbidden'
 *
 * /items/:id/image:
 *   post:
 *     summary: Store product image
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/components/parameters/queryID'
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: string
 *             format: binary
 *             properties:
 *               image:
 *                 type: string
 *                 required: true
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         $ref: '#/components/responses/404NotFoundProduct'
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 *       403:
 *         $ref: '#/components/responses/403Forbidden'
 *
 *   delete:
 *     summary: Delete product image
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
 *         $ref: '#/components/responses/404NotFoundProduct'
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 *       403:
 *         $ref: '#/components/responses/403Forbidden'
 *
 * /items/uploads/:filename:
 *   get:
 *     summary: Download image by filename
 *     produces:
 *       - image/*
 *     parameters:
 *       - in: path
 *         name: filename
 *         description: The filename of stored file at server
 *     responses:
 *        200:
 *          description: OK
 *          content:
 *            image/*:
 *              schema:
 *                type: string
 *                format: binary
 *        404:
 *          description: File not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *              example: {"error": {"code": 404, "message": "no such file or directory"}}
 *
 * components:
 *   responses:
 *     403Forbidden:
 *       description: Action forbidden.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example: {"error": {"code": 403, "message": "Forbidden."}}
 *     404NotFoundProduct:
 *       description: The specified product was not found.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example: {"error": {"code": 404, "message": "product [1] not found"}}
 *
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         price:
 *           description: numeric string with 2 numbers after dot
 *           type: string
 *         userId:
 *           type: integer
 *         user:
 *           type:
 *             $ref: '#/components/schemas/User'
 *         createdAt:
 *           type: datetime
 *         updatedAt:
 *           type: datetime
 *       example:
 *         id: 1
 *         title: Notebook
 *         price: 100.00
 *         userId: 1
 *         user:
 *           id: 1
 *           name: John Doe
 *           email: john-doe@example.com
 *           phone: xxxxxxxxxx
 *           createdAt: 2021-05-01 00:00:00
 *           updatedAt: 2021-05-01 00:00:00
 *         createdAt: 2021-05-01 00:00:00
 *         updatedAt: 2021-05-01 00:00:00
 */
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

router
  .route('/:product/image')
  .all(isAuthenticated, TypeHint, isMyProduct)
  .post(ProductImagesController.create)
  .delete(ProductImagesController.destroy);

router
  .route('/uploads/:file')
  .get(isAuthenticated, (req, res) => {
    res.download(`./public/uploads/${req.params.file}`);
  });


export default router;
