import ProductRepository from '../repositories/product.js';
import ProductResource from '../resources/ProductResource.js';
import multer from '../config/multer.js';
import fs from 'fs';

const uploader = multer.single('file');

function removeFileAsync(path) {
  fs.unlink(path, err => {
    if (err) {
      console.error(err);
    }
  });
}

export const create = async (req, res, next) => {
  uploader(req, res, error => {
    if (error) return next(error);

    if (req.product.image) removeFileAsync(req.product.image);

    ProductRepository.update(req.product.id, {
      image: req.file.path
    }, {include: {user: true}})
      .then(product => res.status(201).json(ProductResource.wrap(product)))
      .catch(error => next(error));
  });
};

export const destroy = async (req, res, next) => {
  try {
    const product = await ProductRepository.update(req.product.id, {
      image: null,
    }, {include: {user: true}});

    removeFileAsync(req.product.image);

    res.json(ProductResource.wrap(product));
  } catch (error) {
    next(error);
  }
};
