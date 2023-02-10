import { Router } from 'express';

const UserRoutes = Router();

// Exclusively for admin
UserRoutes.route('/')
  .get(/* UserController */)
  .post(/* UserController */)
  .put(/* UserController */)
  .delete(/* UserController */);

export default UserRoutes;
