export default class BaseError extends Error {
  constructor(message, code) {
    super(message);
	
    Object.setPrototypeOf(this, new.target.prototype);
    this.code = code;
    Error.captureStackTrace(this);
  }
}