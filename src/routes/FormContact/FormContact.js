import { Router } from 'express';

const FormContactRoutes = Router();

// Exclusively for admin
FormContactRoutes.route('/')
  .get(/* FormContactController */)
  .post(/* FormContactController */)
  .put(/* FormContactController */)
  .delete(/* FormContactController */);

export default FormContactRoutes;
