import { Router } from 'express';

const UserRoutes = Router();

UserRoutes.get('/' /*UserValidator*/ /*UserController*/);
UserRoutes.put('/' /*UserValidator*/ /*UserController*/);

//Exclusively for admin
UserRoutes.post('/' /*UserValidator*/ /*UserController*/);
UserRoutes.delete('/' /*UserValidator*/ /*UserController*/);

export default UserRoutes;
