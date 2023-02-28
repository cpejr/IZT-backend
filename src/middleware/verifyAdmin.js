import ForbiddenError from '../errors/BaseErrors.js';

const verifyAdmin = () => {
  return (req, res, next) => {
    if (!req?.isAdmin) throw new ForbiddenError('Access denied');

    next();
  };
};

export default verifyAdmin;
