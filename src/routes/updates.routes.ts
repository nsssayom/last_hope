import { Router, Request, Response } from 'express';
import { getManager } from 'typeorm'

import { Updates } from "../entity/Updates";

export var updatesRouter = Router();

updatesRouter.get("/", async (req: Request, res: Response) => {
    const updateRepository = getManager().getRepository(Updates);
    console.log(req.query);

    const updates = await updateRepository.find({
        order: {
            updated_on: 'DESC'
        }
    });

    if (updates) {
        res.status(200).json(updates);
    } else {
        res.sendStatus(404);
    }
}
);

export default updatesRouter;