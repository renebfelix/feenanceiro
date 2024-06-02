import { Request, Response, Router } from "express";
import { isEmpty } from "../../../utils/isEmpty";
import { errorHandler } from "../../../utils/errorsHandlers";
import { database } from "../../prisma/client";
import { userDataToken } from "../../../utils/userDatatoken";
import moment from "moment";
import { stringDateFormat } from "../../../utils/dateFormat";

const createBillRoute = Router();

interface BodyProps {
	valueType: "ENTRADA" | "SAIDA";
	description: string;
	value: number;
	date: string;
	type: "FIXA" | "UNICA" | "PARCELADA";
	parcels: number;
	payment: string;
	category: string;
	division: Array<{
		value: string;
		label: string;
	}>;
	observation: string;
}

createBillRoute.post('/app/bill', async (req: Request, res: Response) => {
	const { uuid } = userDataToken(req.headers.authorization ?? '');
	const { valueType, description, value, date, type, parcels, payment, category, division, observation } : BodyProps = req.body;

	if (isEmpty([valueType, description, type, date, payment, category]) || division.length <= 0) {
		res.status(401).send(errorHandler(1, "Preencha todos os campos"));
	} else {
		const createBill = await database.billings_info.create({
			data: {
				valueTypeBillingInfo: valueType,
				descriptionBillingInfo: description,
				valueBillingInfo: value,
				dataBillingInfo: stringDateFormat(date),
				typeBillingInfo: type,
				parcelBillingInfo: parcels,
				paymentBillingInfo: payment,
				categoryBillingInfo: category,
				divisionBillingInfo: division.length,
				idUserBillingInfo: uuid,
				dataCriacaoBillingInfo: new Date(moment().format("YYYY-MM-DD H:mm:ss")),
				observationBillingInfo: observation,
			}
		});

		let ArrayValues : any = [];
		let valorParcela = 0;

		if (type === "PARCELADA") {
			valorParcela = (value/parcels)/division.length;

			for(let i = 1; i <= parcels; i++){
				let dateParcela;

				if (i === 1) {
					dateParcela = date;
				} else {
					dateParcela = moment(new Date(date)).add(i-1, "M").format("YYYY-MM-DD");
				}

				// Looping para divisão
				for(const responsable of division){
					ArrayValues.push({
						valueBillingValue: valorParcela,
						idBillingInfoBillingValue: createBill.idBillingInfo,
						responsableBillingValue: responsable.value,
						dateBillingValue: new Date(dateParcela),
						numberParcelBillingValue: i,
					})
				}
			}
		} else {
			valorParcela = value/division.length;

			for(const responsable of division){
				ArrayValues.push({
					valueBillingValue: valorParcela,
					idBillingInfoBillingValue: createBill.idBillingInfo,
					responsableBillingValue: responsable.value,
					dateBillingValue: stringDateFormat(date),
					numberParcelBillingValue: 1,
				})
			}
		}

		// Cria os valores individuais
		const createValues = await database.billings_values.createMany({
			data: ArrayValues
		});

		if (!createBill || !createValues) {
			res.status(401).send(errorHandler(1, "Ocorreu um erro"));
		} else {
			res.status(201).send();
		}
	}
});

export { createBillRoute }
