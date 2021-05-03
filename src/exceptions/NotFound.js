import BaseError from './BaseError.js';

export default class NotFound extends BaseError {
  constructor(message = 'Not found.', status = 404) {
    super(message, status);
  }
}