import AppError from '../AppError/AppError.js';
import { ERROR_NAMES, ERROR_CODES } from '../errorConstants.js';

export default class ForbiddenError extends AppError {
  constructor(message) {
    super(ERROR_NAMES.FORBIDDEN, ERROR_CODES.FORBIDDEN, message, true);
  }
}
