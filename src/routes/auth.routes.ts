import * as express from 'express';
import { Router, Request, Response } from 'express';
import { validate, ValidationError } from "express-validation";
import { registrationValidation, userValidation, existancialValidation, loginValidation } from "./../schema/userValidators";

import { User } from "./../entity/User";
import { getManager, LessThan } from "typeorm";

export var authRouter = express.Router();
import * as firebase from "firebase-admin";

// Check if phone number has a valid user
authRouter.get("/:phone", async (req: Request, res: Response) => {
    const userRepository = getManager().getRepository(User);
    const phoneNumber = req.params.phone;
    const user = await userRepository.find({
        phone: phoneNumber,
        user_level: LessThan(3)
    });

    if (user.length > 0) {
        if (user[0].user_level < 3) {
            res.sendStatus(200);
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(404);
    }
});

authRouter.get("/token/:token", validate(loginValidation, {}), async (req: Request, res: Response) => {
    const firebaseTokenID = req.params.token;
    const phoneNumber = req.query.phone;

    firebase
        .auth()
        .verifyIdToken(firebaseTokenID)
        .then((decodedToken) => {
            const uid = decodedToken.uid;
            firebase
                .auth()
                .getUser(uid)
                .then(async (userRecord) => {
                    if (userRecord.phoneNumber == phoneNumber){
                        res.sendStatus(200);
                    }
                    else{
                        res.sendStatus(401);
                    }
                })
                .catch((error) => {
                    res.status(406).send(error);
                });
        })
        .catch((error) => {
            res.status(401).send(error);
        });
}
);

export default authRouter;