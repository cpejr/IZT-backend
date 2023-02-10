import { Router } from 'express';

const ProductRoutes = Router();

// Exclusively for admin
ProductRoutes.route('/')
  .get(/* ProductController */)
  .post(/* ProductController */)
  .put(/* ProductController */)
  .delete(/* ProductController */);

export default ProductRoutes;
