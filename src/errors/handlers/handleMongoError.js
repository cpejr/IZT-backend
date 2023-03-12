import { BadRequest, ConflictError } from '../baseErrors.js';

export function isMongoError(err) {
  return err.name === 'ValidationError' || err?.code === 11000;
}
export function handleMongoError(err) {
  if (err.name === 'ValidationError') {
    const fields = Object.keys(err.errors);
    const message = fields.map((field) => err.errors[field].message).join('; ');
    return new BadRequest(`DB validation error(s): ${message}`);
  }

  // err.code === 11000
  const [key, value] = Object.entries(err.keyValue)[0];
  return new ConflictError(
    `Value '${value}' of property '${key}' already exists`
  );
}
