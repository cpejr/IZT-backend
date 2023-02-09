import AppError from '../AppError/AppError.js';
import { ERROR_NAMES, ERROR_CODES } from '../errorConstants.js';

export default class UnauthorizedError extends AppError {
  constructor(message) {
    super(ERROR_NAMES.UNAUTHORIZED, ERROR_CODES.UNAUTHORIZED, message, true);
  }
}
