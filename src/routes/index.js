import { Router } from 'express';
import CategoryRoutes from './CategoryRoutes/CategoryRoutes';
import ProductRoutes from './ProductRoutes/ProductRoutes';
import SessionRoutes from './SessionRoutes/SessionRoutes';
import UserRoutes from './UserRoutes/UserRoutes';

const routes = Router();

routes
  .use('/', SessionRoutes)
  .use('/categories', CategoryRoutes)
  .use('/products', ProductRoutes)
  .use('/users', UserRoutes);
