export const internalError = (err, req, res, next) => {
  console.log(err.message); // todo logger
  res.status(err.code || 500).json({
    error: {
	  code: err.code || 500,
	  message: err.message,
    },
  });
};
