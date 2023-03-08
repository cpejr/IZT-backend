import { Router } from 'express';
import createUploaderMiddleware from '../../config/multer.js';
import * as ProductController from '../../controllers/ProductController.js';
import { documentSpecs, pictureSpecs } from '../../utils/files/filesSpecs.js';

const ProductRoutes = Router();

const processFilesMiddeware = createUploaderMiddleware({
  allowedMimes: [
    ...pictureSpecs.allowedMimeTypes,
    ...documentSpecs.allowedMimeTypes,
  ],
  sizeLimitInMB: Math.max(
    pictureSpecs.sizeLimitInMB,
    documentSpecs.sizeLimitInMB
  ),
  fields: [{ name: 'pictures' }, { name: 'documents' }],
});

ProductRoutes.route('/')
  .get(ProductController.get)
  .post(processFilesMiddeware, ProductController.create);

ProductRoutes.route('/:_id')
  .put(processFilesMiddeware, ProductController.update)
  .delete(ProductController.destroy);

export default ProductRoutes;
