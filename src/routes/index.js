import { Router } from 'express';
import CategoryRoutes from './CategoryRoutes/CategoryRoutes.js';
import FileRoutes from './FileRoutes/FileRoutes.js';
import FormContactRoutes from './FormContactRoutes/FormContactRoutes.js';
import ProductRoutes from './ProductRoutes/ProductRoutes.js';
import SessionRoutes from './SessionRoutes/SessionRoutes.js';
import UserRoutes from './UserRoutes/UserRoutes.js';

const routes = Router();

routes
  .use('/', SessionRoutes)
  .use('/categories', CategoryRoutes)
  .use('/forms-contact', FormContactRoutes)
  .use('/products', ProductRoutes)
  .use('/users', UserRoutes)
  .use('/files', FileRoutes);

export default routes;
