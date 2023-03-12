import { ForbiddenError } from '../baseErrors.js';

export function isJwtError(err) {
  return err?.name === 'JsonWebTokenError' || err?.name === 'TokenExpiredError';
}
export function handleJwtError(err) {
  if (err?.name === 'JsonWebTokenError')
    return new ForbiddenError('Invalid JWT token');
  return new ForbiddenError('JWT token expired');
}
