export default (req, res, next) => {
  console.log(req.isAuthenticated());
  if (!req.isAuthenticated()) {
	return res.status(401).send({});
  }
  next();
};
