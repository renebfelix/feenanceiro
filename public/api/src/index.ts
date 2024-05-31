import express, { Express } from "express";
import dotenv from "dotenv";
import { isValidLogin } from "../services/middleware";
dotenv.config();

import { loginRouter } from './auth/login';
import { createRouter } from './auth/createAccount';
import { refreshRouter } from "./auth/refreshToken";
import { requestPassword } from './auth/reset-password/request-password';

const cors = require('cors');
const bodyParser = require("body-parser");

const app: Express = express();
const port = process.env.APP_PORT;
const urlBase = `${process.env.APP_URL_BASE}`;

// CORS Settings
app.use(cors({
	origin: "*"
}));

// Files public upload
app.use(express.static('public/static'));

// Middlewares
app.use(bodyParser.json());

// Routes - AUTH
app.use(`${urlBase}`, [
	loginRouter,
	createRouter,
	refreshRouter,
	requestPassword
]);

// Rotas autenticadas
app.use(isValidLogin);

// Start Server
app.listen(port, () => {
	console.log(`Feenanceiro Started (${urlBase}): ${Date()}`);
});
