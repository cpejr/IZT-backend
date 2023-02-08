import { Router } from "express";

CategoryRoutes = Router();

CategoryRoutes.get('/', /*CategoryValidator*//*CategoryController*/)

//Exclusively for admin
CategoryRoutes.post('/', /*CategoryValidator*//*CategoryController*/)
CategoryRoutes.put('/', /*CategoryValidator*//*CategoryController*/)
CategoryRoutes.delete('/', /*CategoryValidator*//*CategoryController*/)

export default CategoryRouter;