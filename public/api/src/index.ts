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
	editResponsableRoute,
	deleteResponsableRoute,
	sendEmailResponsableRoute,
	inviteResponsableRouter,
	listInvitesResponsableRouter,
	responseInviteRouter
} from './app/responsables';

import {
	createCardRouter,
	listCardsRouter,
	updateCardRoute,
	deleteCardRoute,
	billingCardRoute
} from './app/cards';

import {
	createBankRouter,
	listBanksRouter,
	updateBankRoute,
	deleteBankRoute
} from "./app/banks";

import {
	userDataRoute,
	editUserRouter,
	verifyPasswordRoute,
	editPasswordRoute
} from './app/user';

import {
	createBillRoute,
	listBillsRoute,
	deleteBillRouter,
	statusBillRoute,
	updateBillRoute,
	stopBillRouter
} from "./app/bills";

import { shareRoute } from './app/share';

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
	changePasswordRoute,

	shareRoute,
]);

app.use(`${urlBase}`, isValidLogin, [
	categoryRoute,
	listCategoriesRouter,
	updateCategoryRoute,
	deleteCategoryRoute,

	createResponsableRouter,
	listResponsablesRouter,
	editResponsableRoute,
	deleteResponsableRoute,
	sendEmailResponsableRoute,
	inviteResponsableRouter,
	listInvitesResponsableRouter,
	responseInviteRouter,

	createCardRouter,
	listCardsRouter,
	updateCardRoute,
	deleteCardRoute,
	billingCardRoute,

	createBankRouter,
	listBanksRouter,
	updateBankRoute,
	deleteBankRoute,

	userDataRoute,
	editUserRouter,
	verifyPasswordRoute,
	editPasswordRoute,

	createBillRoute,
	listBillsRoute,
	deleteBillRouter,
	statusBillRoute,
	updateBillRoute,
	stopBillRouter,
]);

// Start Server
app.listen(port, () => {
	console.log(`Feenanceiro Started (${urlBase}): ${Date()}`);
});
