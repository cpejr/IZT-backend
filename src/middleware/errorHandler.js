import { ZodError } from 'zod';
import AppError from '../errors/AppError/AppError.js';
import BadRequest from '../errors/BadRequest/BadRequest.js';
import JwtInvalidError from '../errors/JwtInvalidError/JwtInvalidError.js';
import JwtExpiredError from '../errors/JwtExpiredError/JwtExpiredError.js';
import InternalServerError from '../errors/InternalServerError/InternalServerError.js';
import ConflictError from '../errors/ConflictError/ConflictError.js';

const errorHandler = (err, req, res) => {
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
    error = new ConflictError('Email or CPF already exists');
  } else if (err?.name === 'JsonWebTokenError') {
    error = new JwtInvalidError();
  } else if (err?.name === 'TokenExpiredError') {
    error = new JwtExpiredError();
  } else {
    error = new InternalServerError(err?.message);
  }

  console.error(
    'Error message from the centralized error-handling component',
    error
  );

  const isDevEnvironment =
    process.env.NODE_ENV === 'development'
      ? {
          stack: error.stack,
        }
      : {};
  res.status(error.httpCode).json({
    name: error.name,
    httpCode: error.httpCode,
    message: error.message,
    isOperational: error.isOperational,
    ...isDevEnvironment,
  });
};

export default errorHandler;
