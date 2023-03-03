import { Router } from 'express';
import uploader from '../../config/multer.js';
import * as ProductController from '../../controllers/ProductController.js';

const ProductRoutes = Router();
const processFilesMiddeware = uploader.fields([
  { name: 'pictures' },
  { name: 'documents' },
]);

ProductRoutes.route('/')
  .get(ProductController.get)
  .post(processFilesMiddeware, ProductController.create);

ProductRoutes.route('/:_id')
  .put(processFilesMiddeware, ProductController.update)
  .delete(ProductController.destroy);

export default ProductRoutes;
