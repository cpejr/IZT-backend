import { Router } from 'express';
import * as ProductController from '../../controllers/ProductController.js';

const ProductRoutes = Router();

// Exclusively for admin
ProductRoutes.route('/')
  .get(ProductController.get)
  .post(ProductController.create);

ProductRoutes.route('/:id')
  .put(ProductController.update)
  .delete(ProductController.destroy);

export default ProductRoutes;
