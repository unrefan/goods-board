import ValidationError from '../exceptions/ValidationError.js';
import multer from 'multer';

export const multerError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
	  error: {
        code: err.code,
        message: err.message,
	  },
    });
  }

  next(err);
};

export const validationError = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(422).json(Object.entries(err.payload.errors).map(([field, messages]) => ({
	  field: field,
	  message: messages[0],
    })));
  }

  next(err);
};

export const internalError = (err, req, res, next) => {
  console.error(err); // todo logger
  res.status(err.status || 500).json({
    error: {
	  code: err.status || err.code || 500,
	  message: err.message,
    },
  });
};
