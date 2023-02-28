import { Router } from 'express';
import * as FileController from '../../controllers/FileController.js';

const FileRoutes = Router();

FileRoutes.get('/:_id', FileController.download);
export default FileRoutes;
