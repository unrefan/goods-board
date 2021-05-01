import ValidationError from '../exceptions/ValidationError.js';

export const validationError = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(422).json(Object.entries(err.payload.errors).map(([field, messages]) => ({
	  field: field,
	  message: messages[0],
    })));
    return;
  }

  next(err);
};

export const internalError = (err, req, res, next) => {
  console.log(err.message); // todo logger
  res.status(err.code || 500).json({
    error: {
	  code: err.code || 500,
	  message: err.message,
    },
  });
};
