import { Router } from 'express';

const UserRoutes = Router();

UserRoutes.route('/')
  .get(/* UserValidator, UserController */)
  .post(/* UserValidator, UserController */)
  .put(/* UserValidator, UserController */)
  .delete(/* UserValidator, UserController */);

export default UserRoutes;
