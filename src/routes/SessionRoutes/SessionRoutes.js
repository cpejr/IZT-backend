import { Router } from 'express';

const SessionssRouter = Router();
SessionssRouter.post('/login' /*SessionsController.Login*/);
SessionssRouter.post('/logout' /*SessionsController.Logout*/);
SessionssRouter.get('/refresh' /*SessionsController.RefreshToken*/);

export default SessionssRouter;
