import Forbidden from '../exceptions/Forbidden.js';

export default (comparator = () => true) => (req, res, next) => {
  if (comparator(req)) {
    return next();
  }
  next(new Forbidden());
};
