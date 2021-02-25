import authRouter from './auth.routes';
import userRouter from './user.routes';
import deviceRouter from './device.routes';
import devicesRouter from './devices.routes';
import validateRouter from './validate.routes';
import warningRouter from './warning.routes';
import updatesRouter from "./updates.routes";
import clientRouter from './client.routes';
import usersRouter from './users.routes';

import { Router } from 'express';

const routes = Router();

routes.use('/user', userRouter);
routes.use('/users', usersRouter);
routes.use('/auth', authRouter);
routes.use('/device', deviceRouter);
routes.use('/devices', devicesRouter);
routes.use('/warning', warningRouter);
routes.use('/validate', validateRouter);
routes.use('/client', clientRouter);
routes.use('/updates', updatesRouter);

export default routes;