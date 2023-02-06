export default class AppError extends Error {
  constructor(name, httpCode, message, isOperational) {
    super(message);
    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}
