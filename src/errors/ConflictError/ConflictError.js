import AppError from '../AppError/AppError.js';
import { ERROR_NAMES, ERROR_CODES } from '../errorConstants.js';

export default class ConflictError extends AppError {
  constructor(message) {
    super(ERROR_NAMES.VALIDATION_ERROR, ERROR_CODES.CONFLICT, message, true);
  }
}
