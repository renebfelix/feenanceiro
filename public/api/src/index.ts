import express, { Express } from "express";
import dotenv from "dotenv";
import { isValidLogin } from "../services/middleware";
dotenv.config();

const cors = require('cors');
const loginRouter = require('./auth/login');

const app: Express = express();
const port = process.env.APP_PORT;
const urlBase = `${process.env.APP_URL_BASE}`;

// CORS Settings
app.use(cors({
	origin: "*"
}));

// Files public upload
app.use(express.static('public/static'));

// Routes
app.use(`${urlBase}`, loginRouter);

// Rotas autenticadas
app.use(isValidLogin);

// Start Server
app.listen(port, () => {
	console.log(`Feenanceiro Started (${urlBase}): ${Date()}`);
});
