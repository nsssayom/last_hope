import "reflect-metadata";
import express from "express";
import socketio from "socket.io";
import {Server, createServer} from 'http';

import { createConnection } from "typeorm";
import { ValidationError } from "express-validation";


import cors from "cors";
import helmet from "helmet";
import firebase from "firebase-admin";

import routes from './routes/routes';
import { log } from "console";

import { User } from "./entity/User";
import { Device } from "./entity/Device";
import { Updates } from "./entity/Updates";

// establish typeorm connection
createConnection()
	.then(async (connection) => {

		const updateRepository = connection.getRepository(Updates)
		const deviceRepository = connection.getRepository(Device)

		const app = express();
		const port: Number = Number(process.env.PORT) || 3000;

		//let http = require("http").Server(app);
		const http_server = createServer(app);
		
		const io = require('socket.io')(http_server);

		//export GOOGLE_APPLICATION_CREDENTIALS="/home/ubuntu/dev/last_hope/keys/last-hope.json"
		firebase.initializeApp({ credential: firebase.credential.applicationDefault() });

		app.use(cors({ origin: true, credentials: true }));
		app.use(helmet());
		app.use(express.json());

		app.use(function (err, req, res, next) {
			console.log(req.body);

			res.header("Access-Control-Allow-Origin", "*");
			res.header(
				"Access-Control-Allow-Headers",
				"Origin, X-Requested-With, Content-Type, Accept"
			);
			next();

			if (err instanceof ValidationError) {
				return res.status(err.statusCode).json(err);
			}
			return res.status(500).json(err);
		});

		app.use(routes);

		io.on("connection", function (socket: any) {
			console.log("a user connected");
			// whenever we receive a 'message' we log it out
			socket.on("location_update", async function (message: any) {
				// console.log(message);
				const device = await deviceRepository.findOne({id: message.uuid}, { relations: ["user"] })
				const newUpdate = new Updates()

				newUpdate.user_id = device.user.id; 
				newUpdate.heart_rate = message.heart_rate
				newUpdate.long = message.long
				newUpdate.lat = message.lat

				await updateRepository.save(newUpdate);
			});
		});

		const startServer = async () => {
			await http_server.listen(port, () => {
				console.log(`Server running on http://localhost:${port}`);
			});
		};
		
		startServer();
	})
	.catch((error) => console.log(error));