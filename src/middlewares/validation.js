import Validator from 'validatorjs';
import ValidationError from '../exceptions/ValidationError.js';

export default (rules, messages = {}) => (req, res, next) => {
  const validator = new Validator(req.body, rules, messages);

  validator.passes(() => next());
  validator.fails(() => next(new ValidationError(validator.errors)));
};
