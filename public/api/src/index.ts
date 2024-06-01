import express, { Express } from "express";
import dotenv from "dotenv";
import { isValidLogin } from "../services/middleware";
dotenv.config();

import {
	loginRouter,
	createRouter,
	refreshRouter,
	requestPassword,
	verifyPasswordRouter,
	changePasswordRoute
} from "./auth";

import {
	categoryRoute,
	deleteCategoryRoute,
	listCategoriesRouter,
	updateCategoryRoute
} from './app/categories';


import {
	createResponsableRouter,
	listResponsablesRouter,
	editResponsableRoute
} from './app/responsables'

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
	requestPassword,
	verifyPasswordRouter,
	changePasswordRoute
]);

// Rotas autenticadas
app.use(isValidLogin);

app.use(`${urlBase}`, [
	categoryRoute,
	listCategoriesRouter,
	updateCategoryRoute,
	deleteCategoryRoute,
	createResponsableRouter,
	listResponsablesRouter,
	editResponsableRoute
]);

// Start Server
app.listen(port, () => {
	console.log(`Feenanceiro Started (${urlBase}): ${Date()}`);
});
