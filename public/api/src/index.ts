import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { UserProps } from '@feenanceiro/types';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
	const user: UserProps = {
		name: "Rene",
	};

	res.send("Express + TypeScript Server");
});

app.listen(port, () => {
console.log(`[server]: Server is running at http://localhost:${port}`);
});
