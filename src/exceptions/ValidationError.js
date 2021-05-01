import BaseError from './BaseError.js';

export default class ValidationError extends BaseError {
  constructor(errors, message = 'Given results is invalid.', code = 422) {
    super(message, code, errors);
  }
}