import { Router } from 'express';
import * as UserController from '../../controllers/UserController.js';

const UserRoutes = Router();

UserRoutes.route('/').get(UserController.get).post(UserController.create);

UserRoutes.route('/:id')
  .put(UserController.update)
  .delete(UserController.destroy);

export default UserRoutes;
