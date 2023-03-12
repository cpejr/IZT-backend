import { ZodError } from 'zod';
import { BadRequest } from '../baseErrors.js';

export function isZodError(err) {
  return err instanceof ZodError;
}
export function handleZodError(err) {
  const msg = err.errors.map(({ message }) => message).join('; ');
  return new BadRequest(`Request validation error(s): ${msg}`);
}
