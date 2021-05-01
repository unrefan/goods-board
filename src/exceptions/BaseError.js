export default class BaseError extends Error {
  constructor(message, code = 500, payload = {}) {
    super(message);
	
    Object.setPrototypeOf(this, new.target.prototype);
    this.code = code;
    this.payload = payload;
    Error.captureStackTrace(this);
  }
}