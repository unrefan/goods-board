import passport from '../services/auth.js';

export const isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send({});
  }
  next();
};

export const isJwtAuth = (req, res, next) => passport.authenticate('jwt', {session: false})(req, res, next);

export default (req, res, next) => {
  if (req.headers['Authorization'] || req.headers['authorization']) {
	return isJwtAuth(req, res, next);
  }
  return isAuthenticated(req, res, next);
};
