import BaseError from './BaseError.js';

export default class Forbidden extends BaseError {
  constructor(message = 'Forbidden.', status = 403) {
    super(message, status);
  }
}