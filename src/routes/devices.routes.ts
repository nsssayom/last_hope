import { Router, Request, Response } from 'express';
import { getManager } from 'typeorm'
import { Device } from "../entity/Device";

export var devicesRouter = Router();

devicesRouter.get("/", async (req: Request, res: Response) => {
    const deviceRepository = getManager().getRepository(Device);

    const devices = await deviceRepository.find({ relations: ["user"] });

    if (devices) {
        res.status(200).json(devices);
    } else {
        res.sendStatus(404);
    }
}
);

export default devicesRouter;