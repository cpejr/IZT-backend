import { Router } from 'express';
import * as UserController from '../../controllers/UserController.js';
import verifyAdmin from '../../middleware/verifyAdmin.js';
import verifyJWT from '../../middleware/verifyJWT.js';

const UserRoutes = Router();

UserRoutes.route('/')
  .get(verifyJWT, verifyAdmin, UserController.get)
  .post(UserController.create);

UserRoutes.route('/:_id')
  .put(UserController.update)
  .delete(UserController.destroy);

export default UserRoutes;
