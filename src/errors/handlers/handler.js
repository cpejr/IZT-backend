import { AppError, InternalServerError } from '../baseErrors.js';
import { handleJwtError, isJwtError } from './handleJwtError.js';
import { handleMongoError, isMongoError } from './handleMongoError.js';
import { handleMulterError, isMulterError } from './handleMulterError.js';
import { handleZodError, isZodError } from './handleZodError.js';

export default function handler(err) {
  if (err instanceof AppError) return err;
  if (isMulterError(err)) return handleMulterError(err);
  if (isMongoError(err)) return handleMongoError(err);
  if (isZodError(err)) return handleZodError(err);
  if (isJwtError(err)) return handleJwtError(err);

  return new InternalServerError(err?.message);
}
