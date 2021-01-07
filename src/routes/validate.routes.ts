import { Router, Request, Response } from 'express';
import { validate } from "express-validation";
import { existancialValidation } from "./../schema/userValidators";

import { User } from "./../entity/User";
import { getManager } from "typeorm";

export var validateRouter = Router();

validateRouter.post("/", validate(existancialValidation, {}), async (req: Request, res: Response) => {
    const userRepository = getManager().getRepository(User);
    console.log(req.body);
    const user = await userRepository.find(req.body);
    if (user.length > 0) {
        res.status(400).json("Parameter already exists");
    } else {
        res.sendStatus(200);
    }
}
);

export default validateRouter;