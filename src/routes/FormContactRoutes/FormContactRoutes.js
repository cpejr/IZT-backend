import { Router } from 'express';
import sendFormContactEmail from '../../controllers/FormContactController.js';

const FormContactRoutes = Router();

// Exclusively for admin

FormContactRoutes.post('/', sendFormContactEmail);

export default FormContactRoutes;
