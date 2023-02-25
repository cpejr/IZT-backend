import { Router } from 'express';
import * as CategoryController from '../../controllers/CategoryController.js';

const CategoryRoutes = Router();

// Exclusively for admin
CategoryRoutes.route('/')
  .get(CategoryController.get)
  .post(CategoryController.create);

CategoryRoutes.route('/:_id')
  .put(CategoryController.update)
  .delete(CategoryController.destroy);

export default CategoryRoutes;
