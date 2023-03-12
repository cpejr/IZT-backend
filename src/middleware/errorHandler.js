import logger from '../config/logger.js';
import handler from '../errors/handlers/handler.js';
import isDevEnvironment from '../utils/isDevEnvironment.js';

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const error = handler(err);
  error.stack = err.stack;

  logger.error(
    error,
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
