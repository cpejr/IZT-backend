import multer from 'multer';
import { BadRequest } from '../baseErrors.js';

export function isMulterError(err) {
  return err instanceof multer.MulterError;
}
export function handleMulterError(err) {
  return new BadRequest(`Multer exit with message: ${err.message}`);
}
