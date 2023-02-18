import { Router } from 'express';

const UserRoutes = Router();

// Exclusively for admin
/* UserRoutes.route('/')
UserRoutes.post('/users', UserController.createUser);

// Get a user by ID
UserRoutes.get('/users/:id', UserController.getUserById);

// Update a user by ID
UserRoutes.put('/users/:id', UserController.updateUser);

// Delete a user by ID
UserRoutes.delete('/users/:id', UserController.deleteUser);

// Get all users
UserRoutes.get('/users', UserController.getAllUsers); */

export default UserRoutes;
