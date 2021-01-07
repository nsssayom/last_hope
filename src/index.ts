import "reflect-metadata";
import * as express from "express";
import { createConnection } from "typeorm";
import { validate, ValidationError } from "express-validation";
import * as cors from "cors";
import * as helmet from "helmet";
import * as firebase from "firebase-admin";

import routes from './routes/routes';

// establish typeorm connection
createConnection()
	.then(async (connection) => {
		// initiate express app
		const app = express();
		// defining port 3000 to be used
		const port: Number = Number(process.env.PORT) || 3000;

		//export GOOGLE_APPLICATION_CREDENTIALS="/home/ubuntu/dev/last_hope/keys/last-hope.json"
		firebase.initializeApp({credential: firebase.credential.applicationDefault()});

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

		app.listen(port, () => {
			console.log(`Server is running on port http://192.168.31.200:${port}`);
		});
	})
	.catch((error) => console.log(error));