import express from 'express';
import ProductRoutes from './ProductRoutes/ProductRoutes';
import CategoryRoutes from './CategoryRoutes/CategoryRoutes';
import SessionRouter from './SessionRoutes/SessionRoutes';
import UserRoutes from './UserRoutes/UserRoutes';

const routes = express.Router();

routes.use('/users', UserRoutes);
routes.use('/categories', CategoryRoutes);
routes.use('/products', ProductRoutes);
routes.use('/sessions', SessionRouter);

export default routes;
