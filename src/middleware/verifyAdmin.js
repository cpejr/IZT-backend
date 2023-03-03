import { ForbiddenError } from '../errors/BaseErrors.js';
import asyncHandler from '../utils/asyncHandler.js';

const verifyAdmin = asyncHandler(async (req, res, next) => {
  if (!req?.isAdmin) throw new ForbiddenError('Access denied');

  next();
});

export default verifyAdmin;
