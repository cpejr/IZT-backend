import { Router } from "express";

ProductRoutes = Router();

ProductRoutes.get('/', /*ProductValidator*//*ProductController*/)

//Exclusively for admin
ProductRoutes.post('/', /*ProductValidator*//*ProductController*/)
ProductRoutes.put('/', /*ProductValidator*//*ProductController*/)
ProductRoutes.delete('/', /*ProductValidator*//*ProductController*/)

export default ProductRouter;