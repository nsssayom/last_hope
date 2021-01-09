import { Router, Request, Response } from 'express';
import { getManager } from 'typeorm'

import { Warning } from "../entity/Warning";

export var warningRouter = Router();

warningRouter.post("/", async (req: Request, res: Response) => {
    const warningRepository = getManager().getRepository(Warning);

    const newWarning = new Warning();

    newWarning.title = req.body.title;
    newWarning.area_code = req.body.area_code;
    // newWarning.issued_on = req.body.issued_on;
    newWarning.eta = req.body.eta;
    newWarning.eta_over = req.body.eta_over;

    try {
        await warningRepository.save(newWarning);
        res.sendStatus(201).json();
    } catch (error) {
        console.log(error);
        res.sendStatus(400).json(error);
    }
}
);

warningRouter.get("/", async (req: Request, res: Response) => {
    const warningRepository = getManager().getRepository(Warning);
	console.log(req.query);
	
    const warning = await warningRepository.findOne( req.query, { relations: ["user"] });
	
	if (warning) {
        res.status(200).json(warning);
    } else {
        res.sendStatus(404);
    }
}
);

export default warningRouter;