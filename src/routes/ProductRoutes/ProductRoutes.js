import { Router } from 'express';

const ProductRoutes = Router();

ProductRoutes.get('/' /*ProductValidator*/ /*ProductController*/);

//Exclusively for admin
ProductRoutes.post('/' /*ProductValidator*/ /*ProductController*/);
ProductRoutes.put('/' /*ProductValidator*/ /*ProductController*/);
ProductRoutes.delete('/' /*ProductValidator*/ /*ProductController*/);

export default ProductRoutes;
