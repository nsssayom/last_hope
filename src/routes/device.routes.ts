import { Router, Request, Response } from 'express';
import { validate } from "express-validation";
// import { registrationValidation, userValidation} from "./../schema/userValidators";
import { getManager } from 'typeorm'

import { Device } from "./../entity/Device";
import { User } from "./../entity/User";

export var deviceRouter = Router();

deviceRouter.post("/", async (req: Request, res: Response) => {
    const deviceRepository = getManager().getRepository(Device);
    const userRepository = getManager().getRepository(User);

    const newDevice = new Device();

    newDevice.gsm_imei = req.body.gsm_imei;
	newDevice.gsm_msisdn = req.body.gsm_msisdn;
    // newDevice.hw_version = req.body.hw_version;
    // newDevice.sw_version = req.body.sw_version;
	newDevice.area_code = req.body.area_code;

    const assignedUser = await userRepository.findOne({id_type: req.body.id_type, id_number: req.body.id_number});
	newDevice.user = assignedUser;

    try {
        await deviceRepository.save(newDevice);
        res.sendStatus(201).json();
    } catch (error) {
        console.log(error);
        res.sendStatus(400).json(error);
    }
}
);

deviceRouter.get("/", async (req: Request, res: Response) => {
    const deviceRepository = getManager().getRepository(Device);
	console.log(req.query);
	
	
    const device = await deviceRepository.findOne( req.query, { relations: ["user"] });
	
	if (device) {
        res.status(200).json(device);
    } else {
        res.sendStatus(404);
    }
}
);

export default deviceRouter;