export default class BaseError extends Error {
  constructor(message, status = 500, payload = {}) {
    super(message);
	
    Object.setPrototypeOf(this, new.target.prototype);
    this.status = status;
    this.payload = payload;
    Error.captureStackTrace(this);
  }
}