import { Router } from 'express';

const SessionssRouter = Router();
SessionssRouter.post('/login', SessionsController.handleLogin);
SessionssRouter.post('/logout', SessionsController.handleLogout);
SessionssRouter.get('/refresh', SessionsController.handleRefreshToken);

export default SessionssRouter;