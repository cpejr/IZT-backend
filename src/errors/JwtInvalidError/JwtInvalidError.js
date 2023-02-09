import AppError from '../AppError/AppError.js';
import { ERROR_NAMES, ERROR_CODES } from '../errorConstants.js';

export default class JwtInvalidError extends AppError {
  constructor() {
    super(
      ERROR_NAMES.FORBIDDEN,
      ERROR_CODES.FORBIDDEN,
      'Invalid JWT token',
      true
    );
  }
}
