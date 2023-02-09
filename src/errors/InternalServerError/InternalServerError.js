import AppError from '../AppError/AppError.js';
import { ERROR_NAMES, ERROR_CODES } from '../errorConstants.js';

export default class InternalServerError extends AppError {
  constructor(message = 'Something went wrong') {
    super(
      ERROR_NAMES.INTERNAL_SERVER,
      ERROR_CODES.INTERNAL_SERVER,
      message,
      false
    );
  }
}
