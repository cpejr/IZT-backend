import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/errorHandler.js';
import corsOptions from './config/corsOptions.js';
import routes from './routes/index.js';

const isDevEnvironment = process.env.NODE_ENV === 'development';

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

// Needs to be after the routes
app.use(errorHandler);

export default app;
