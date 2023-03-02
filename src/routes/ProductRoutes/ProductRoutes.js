import { Router } from 'express';
import uploader from '../../config/multer.js';
import * as ProductController from '../../controllers/ProductController.js';
import verifyAdmin from '../../middleware/verifyAdmin.js';
import verifyJWT from '../../middleware/verifyJWT.js';

const ProductRoutes = Router();
const processFilesMiddeware = uploader.fields([
  { name: 'pictures' },
  { name: 'documents' },
]);

ProductRoutes.route('/')
  .get(verifyJWT, verifyAdmin, ProductController.get)
  .post(processFilesMiddeware, ProductController.create);

ProductRoutes.route('/:_id')
  .put(processFilesMiddeware, ProductController.update)
  .delete(ProductController.destroy);

export default ProductRoutes;
