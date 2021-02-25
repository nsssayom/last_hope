import { Router, Request, Response } from 'express';
import { getManager } from 'typeorm'
import { User } from "../entity/User";

export var usersRouter = Router();

usersRouter.get("/", async (req: Request, res: Response) => {
    const userRepository = getManager().getRepository(User);
    console.log(req.query);
    const user = await userRepository.find(req.query);
    if (user.length > 0) {
        res.status(200).json(user);
    } else {
        res.sendStatus(404);
    }
}
);

export default usersRouter;