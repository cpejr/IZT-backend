import AppError from '../AppError/AppError.js';
import { ERROR_NAMES, ERROR_CODES } from '../errorConstants.js';

export default class JwtExpiredError extends AppError {
  constructor() {
    super(
      ERROR_NAMES.FORBIDDEN,
      ERROR_CODES.FORBIDDEN,
      'JWT token expired',
      true
    );
  }
}
