import { ZodError } from 'zod';
import logger from '../config/logger.js';
import {
  AppError,
  BadRequest,
  JwtInvalidError,
  JwtExpiredError,
  ConflictError,
  InternalServerError,
} from '../errors/BaseErrors.js';
import isDevEnvironment from '../utils/isDevEnvironment.js';

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let error;

  if (err instanceof AppError) {
    error = err;
  } else if (err instanceof ZodError) {
    // eslint-disable-next-line no-shadow
    const message = err.errors.map(({ message }) => message).join('; ');
    error = new BadRequest(`Request validation error(s): ${message}`);
  } else if (err.name === 'ValidationError') {
    const fields = Object.keys(err.errors);
    const message = fields.map((field) => err.errors[field].message).join('; ');
    error = new BadRequest(`DB validation error(s): ${message}`);
  } else if (err?.code === 11000) {
    const [key, value] = Object.entries(err.keyValue)[0];
    error = new ConflictError(
      `Value '${value}' of property '${key}' already exists`
    );
  } else if (err?.name === 'JsonWebTokenError') {
    error = new JwtInvalidError();
  } else if (err?.name === 'TokenExpiredError') {
    error = new JwtExpiredError();
  } else {
    error = new InternalServerError(err?.message);
  }

  logger.error(
    err,
    'Error message from the centralized error-handling component'
  );

  res.status(error.httpCode).json({
    name: error.name,
    httpCode: error.httpCode,
    message: error.message,
    isOperational: error.isOperational,
    ...(isDevEnvironment && { stack: error.stack }),
  });
};

export default errorHandler;
