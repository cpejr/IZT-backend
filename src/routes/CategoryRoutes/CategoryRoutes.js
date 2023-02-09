import { Router } from 'express';

const CategoryRoutes = Router();

// Exclusively for admin
CategoryRoutes.route('/')
  .get(/* CategoryValidator, CategoryController */)
  .post(/* CategoryValidator, CategoryController */)
  .put(/* CategoryValidator, CategoryController */)
  .delete(/* CategoryValidator, CategoryController */);
