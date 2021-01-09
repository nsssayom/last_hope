import { Router, Request, Response } from 'express';
import * as path from 'path';

export var clientRouter = Router();

clientRouter.get("/", async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + './../views/client.html'));
}
);

export default clientRouter;