import * as express from "express"
import { Request, Response } from "express";

import "reflect-metadata";
import { createConnection } from "typeorm";

import { User } from "./entity/User";
import { Device } from "./entity/Device";

import { validate, ValidationError } from "express-validation";
import { registrationValidation, userValidation, existancialValidation } from "./schema/userValidators";

import * as cors from "cors";

// establish typeorm connection
createConnection().then(async connection => {

    const userRepository = connection.getRepository(User);
    const deviceRepository = connection.getRepository(Device);

    // initiate express app
    const app = express();

    app.use(cors({origin:true,credentials: true}));
    app.use(express.json());

    const port: Number = Number(process.env.PORT) || 3000;

    app.post('/user', validate(registrationValidation, {}), async (req: Request, res: Response) => {
        const newUser = new User();
        newUser.id_type = req.body.id_type;

        newUser.id_number = req.body.id_number;
        newUser.name = req.body.name;
        newUser.email = req.body.email;
        newUser.phone = req.body.phone;
        newUser.user_level = req.body.user_level;

        try {
            await connection.manager.save(newUser);
            res.sendStatus(201).json();
        } catch (error) {
            console.log(error);
            res.sendStatus(400).json(error)
        }
    });

    app.get('/user', validate(userValidation, {}), async (req: Request, res: Response) => {
        console.log(req.body);
        const user = await userRepository.find(req.body)
        if (user.length > 0) {
            res.status(200).json(user);
        }
        else {
            res.sendStatus(404)
        }

    });

    app.post('/validate', validate(existancialValidation, {}),
        async (req: Request, res: Response) => {
            console.log(req.body);
            const user = await userRepository.find(req.body)
            if (user.length > 0) {
                res.status(400).json("Parameter already exists");
            }
            else {
                res.sendStatus(200)
            }
        });

    app.use(function (err, req, res, next) {
        console.log(req.body);

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();

        if (err instanceof ValidationError) {
            return res.status(err.statusCode).json(err);
        }
        return res.status(500).json(err);
    });

    app.listen(port, () => {
        console.log(`Server is running on port http://victim.live:${port}`);
    });

}).catch(error => console.log(error));
