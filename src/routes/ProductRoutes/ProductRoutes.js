import { Router } from 'express';
import uploader from '../../config/multer.js';
import * as ProductController from '../../controllers/ProductController.js';

const ProductRoutes = Router();

// Exclusively for admin
ProductRoutes.route('/')
  .get(ProductController.get)
  .post(
    uploader.fields([{ name: 'pictures' }, { name: 'documents' }]),
    ProductController.create
  );

ProductRoutes.route('/:_id')
  .put(ProductController.update)
  .delete(ProductController.destroy);

export default ProductRoutes;
