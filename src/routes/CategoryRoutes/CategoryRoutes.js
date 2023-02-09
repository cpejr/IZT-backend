import { Router } from 'express';

const CategoryRoutes = Router();

CategoryRoutes.route('/')
  .get(/* CategoryValidator, CategoryController */)
  .post(/* CategoryValidator, CategoryController */)
  .put(/* CategoryValidator, CategoryController */)
  .delete(/* CategoryValidator, CategoryController */);

export default CategoryRoutes;
