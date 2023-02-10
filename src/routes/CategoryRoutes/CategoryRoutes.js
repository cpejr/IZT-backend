import { Router } from 'express';

const CategoryRoutes = Router();

// Exclusively for admin
CategoryRoutes.route('/')
  .get(/* CategoryController */)
  .post(/* CategoryController */)
  .put(/* CategoryController */)
  .delete(/* CategoryController */);

export default CategoryRoutes;
