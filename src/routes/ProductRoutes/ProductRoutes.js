import { Router } from 'express';

const ProductRoutes = Router();

// Exclusively for admin
ProductRoutes.route('/')
  .get(/* ProductValidator, ProductController */)
  .post(/* ProductValidator, ProductController */)
  .put(/* ProductValidator, ProductController */)
  .delete(/* ProductValidator, ProductController */);

export default ProductRoutes;
