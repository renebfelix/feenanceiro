import { Request, Response, Router } from "express";
import { isEmpty } from "../../../utils/isEmpty";
import { errorHandler } from "../../../utils/errorsHandlers";
import { database } from "../../prisma/client";
import { userDataToken } from "../../../utils/userDatatoken";
import { fieldsBillInfo, parcelsFieldsValueBill } from "./utils";
import { BodyBillProps } from "./types/types";

const createBillRoute = Router();

createBillRoute.post('/app/bill', async (req: Request, res: Response) => {
	const { uuid } = userDataToken(req.headers.authorization ?? '');
	const bodyProps : BodyBillProps = req.body;

	if (isEmpty([
			bodyProps.valueType,
			bodyProps.description,
			bodyProps.type,
			bodyProps.date,
			bodyProps.payment,
			bodyProps.category
		]) || bodyProps.division.length <= 0
	) {
		res.status(401).send(errorHandler(1, "Preencha todos os campos"));
	} else {
		// Cria informação da compra
		const createBill = await database.billings_info.create({
			data: fieldsBillInfo(bodyProps, uuid)
		});

		// Cria os valores individuais
		const createValues = await database.billings_values.createMany({
			data: parcelsFieldsValueBill(bodyProps, createBill.idBillingInfo)
		});

		if (!createBill || !createValues) {
			res.status(401).send(errorHandler(1, "Ocorreu um erro"));
		} else {
			res.status(201).send();
		}
	}
});

export { createBillRoute }
