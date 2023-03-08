/* eslint-disable max-classes-per-file */
import { ERROR_CODES, ERROR_NAMES } from '../utils/constants.js';

export class AppError extends Error {
  constructor(name, httpCode, message, isOperational) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;
  }
}

export class ValidationError extends AppError {
  constructor(message) {
    super(ERROR_NAMES.VALIDATION_ERROR, ERROR_CODES.FORBIDDEN, message, true);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message) {
    super(ERROR_NAMES.UNAUTHORIZED, ERROR_CODES.UNAUTHORIZED, message, true);
  }
}

export class JwtInvalidError extends AppError {
  constructor() {
    super(
      ERROR_NAMES.FORBIDDEN,
      ERROR_CODES.FORBIDDEN,
      'Invalid JWT token',
      true
    );
  }
}

export class JwtExpiredError extends AppError {
  constructor() {
    super(
      ERROR_NAMES.FORBIDDEN,
      ERROR_CODES.FORBIDDEN,
      'JWT token expired',
      true
    );
  }
}

export class ForbiddenError extends AppError {
  constructor(message) {
    super(ERROR_NAMES.FORBIDDEN, ERROR_CODES.FORBIDDEN, message, true);
  }
}

export class NotFoundError extends AppError {
  constructor(message) {
    super(ERROR_NAMES.NOT_FOUND, ERROR_CODES.NOT_FOUND, message, true);
  }
}

export class ConflictError extends AppError {
  constructor(message) {
    super(ERROR_NAMES.VALIDATION_ERROR, ERROR_CODES.CONFLICT, message, true);
  }
}

export class BadRequest extends AppError {
  constructor(message) {
    super(ERROR_NAMES.BAD_REQUEST, ERROR_CODES.BAD_REQUEST, message, true);
  }
}

export class InternalServerError extends AppError {
  constructor(message = 'Something went wrong') {
    super(
      ERROR_NAMES.INTERNAL_SERVER,
      ERROR_CODES.INTERNAL_SERVER,
      message,
      false
    );
  }
}
