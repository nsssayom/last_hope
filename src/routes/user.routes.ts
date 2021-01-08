import { Router, Request, Response } from 'express';
import { validate} from "express-validation";
import { registrationValidation, userValidation} from "./../schema/userValidators";
import { getManager } from 'typeorm'
import { User } from "./../entity/User";

export var userRouter = Router();

userRouter.post("/", validate(registrationValidation, {}), async (req: Request, res: Response) => {
    const userRepository = getManager().getRepository(User);
    const newUser = new User();

    newUser.id_type = req.body.id_type;
    newUser.id_number = req.body.id_number;
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.phone = req.body.phone;
    newUser.user_level = req.body.user_level;

    try {
        await userRepository.save(newUser);
        res.sendStatus(201).json();
    } catch (error) {
        console.log(error);
        res.sendStatus(400).json(error);
    }
}
);

userRouter.get("/", validate(userValidation, {}), async (req: Request, res: Response) => {
    const userRepository = getManager().getRepository(User);
    console.log(req.query);
    const user = await userRepository.find(req.query);
    if (user.length > 0) {
        res.status(200).json(user[0]);
    } else {
        res.sendStatus(404);
    }
}
);

export default userRouter;