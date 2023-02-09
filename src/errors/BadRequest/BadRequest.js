import AppError from '../AppError/AppError.js';
import { ERROR_NAMES, ERROR_CODES } from '../errorConstants.js';

export default class BadRequest extends AppError {
  constructor(message) {
    super(ERROR_NAMES.BAD_REQUEST, ERROR_CODES.BAD_REQUEST, message, true);
  }
}
