import { ForbiddenError } from '../errors/BaseErrors.js';

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(', ');
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new ForbiddenError('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
