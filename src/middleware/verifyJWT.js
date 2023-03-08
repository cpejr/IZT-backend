import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/baseErrors.js';

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader) throw new UnauthorizedError('No authorization header');
  const [scheme, token] = authHeader.split(' ');

  if (!/^Bearer$/i.test(scheme))
    throw new UnauthorizedError('Token badformatted'); // Bearer not found
  if (!token) throw new UnauthorizedError('No token provided'); // Token not found

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  req.userId = decoded.userId;
  req.isAdmin = decoded.isAdmin;

  next();
};

export default verifyJWT;
