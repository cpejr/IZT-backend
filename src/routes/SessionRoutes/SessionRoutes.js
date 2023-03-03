import { Router } from 'express';
import * as SessionsController from '../../controllers/SessionsController.js';

const SessionRoutes = Router();

SessionRoutes.post('/login', SessionsController.handleLogin);
SessionRoutes.get('/logout', SessionsController.handleLogout);
SessionRoutes.get('/refresh', SessionsController.handleRefreshToken);

export default SessionRoutes;
