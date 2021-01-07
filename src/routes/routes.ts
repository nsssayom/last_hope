import authRouter from './auth.routes';
import userRouter from './user.routes';
import validateRouter from './validate.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/user', userRouter);
routes.use('/auth', authRouter);
routes.use('/validate', validateRouter);

export default routes;