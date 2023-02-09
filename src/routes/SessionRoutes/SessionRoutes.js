import { Router } from 'express';

const SessionRoutes = Router();

SessionRoutes.post('/login' /* SessionsController.handleLogin */);
SessionRoutes.post('/logout' /* SessionsController.handleLogout */);
SessionRoutes.get('/refresh' /* SessionsController.handleRefreshToken */);

export default SessionRoutes;
