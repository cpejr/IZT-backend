import { Router } from 'express';
import emailSender from '../../config/emailSender.js';

const FormContactRoutes = Router();

// Exclusively for admin
FormContactRoutes.route('/')
  .get(emailSender)
  .post(/* FormContactController */)
  .put(/* FormContactController */)
  .delete(/* FormContactController */);

export default FormContactRoutes;
