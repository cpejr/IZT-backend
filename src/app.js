import path from 'path';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/errorHandler.js';
import corsOptions from './config/cors.js';
import routes from './routes/index.js';
import isDevEnvironment from './utils/isDevEnvironment.js';
import { NotFoundError } from './errors/BaseErrors.js';
import fileDirName from './utils/fileDirName.js';

// Inicializando instância do servidor express
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(helmet());
if (isDevEnvironment) app.use(morgan('dev'));

// Routes
app.use('/api', routes);
// Serving files
const { __dirname } = fileDirName(import.meta.url);
app.use(
  '/api/files',
  express.static(path.resolve(__dirname, '../temp/uploads'))
);

// Non existing routes
app.all('*', (req, res, next) => {
  next(new NotFoundError('Route not found'));
});

// Needs to be after the routes
app.use(errorHandler);

export default app;
