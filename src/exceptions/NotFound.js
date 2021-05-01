import BaseError from './BaseError.js';

export default class NotFound extends BaseError {
  constructor(message = 'Not found.', code = 404) {
    super(message, code);
  }
}