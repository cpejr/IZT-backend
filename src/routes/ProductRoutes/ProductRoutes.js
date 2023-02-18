import { Router } from 'express';
import * as ProductController from '../../controllers/ProductController.js';

const ProductRoutes = Router();

// Exclusively for admin
ProductRoutes.route('/');
ProductRoutes.get('/', ProductController.index);
ProductRoutes.post('/', ProductController.create);
ProductRoutes.put('/:id', ProductController.update);
ProductRoutes.delete('/:id', ProductController.exclude);

export default ProductRoutes;
