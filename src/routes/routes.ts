import authRouter from './auth.routes';
import userRouter from './user.routes';
import deviceRouter from './device.routes';
import validateRouter from './validate.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/user', userRouter);
routes.use('/auth', authRouter);
routes.use('/device', deviceRouter);
routes.use('/validate', validateRouter);

export default routes;