import { Request, Response, Router } from "express";
import { userDataToken } from "../../../utils/userDatatoken";
import { database } from "../../prisma/client";
import { errorHandler } from "../../../utils/errorsHandlers";
import { regexDate } from "../../../utils/regex";

const listBillsRoute = Router();

listBillsRoute.get('/app/bills', async(req: Request, res: Response) => {
	const { period, responsable, payment, category, type, paymentValue } = req.query;
	const { uuid } = userDataToken(req.headers.authorization ?? '');

	if (!period){
		res.status(401).send(errorHandler(2, "Parâmetros insuficientes"));
	} else {
		if (!regexDate(period.toString())){
			res.status(401).send(errorHandler(2, "Período informado inválido"));
		} else {
			const dateSplit = period?.toString().split("-");

			const listBills = await database.billings_values.findMany({
				where: {
					dateBillingValue: {
						gte: dateSplit && new Date(dateSplit[1]+'-'+dateSplit[0]+'-01'),
						lte: dateSplit && new Date(dateSplit[1]+'-'+dateSplit[0]+'-31'),
					},
					responsableBillingValue: responsable?.toString(),
					billings_info:{
						idUserBillingInfo: uuid,
						deletedBillingInfo: null,
						typeBillingInfo: type?.toString(),
						categoryBillingInfo: category?.toString(),
						valueTypeBillingInfo: paymentValue?.toString(),
						paymentBillingInfo: payment?.toString(),
					}
				},
				select: {
					valueBillingValue: true,
					idBillingValue: true,
					responsableBillingValue: true,
					numberParcelBillingValue: true,
					dateBillingValue: true,
					billings_info: {
						select:{
							idBillingInfo: true,
							descriptionBillingInfo: true,
							valueBillingInfo: true,
							observationBillingInfo: true,
							parcelBillingInfo: true,
							divisionBillingInfo: true,
							typeBillingInfo: true,
							dataCriacaoBillingInfo: true,
							dataBillingInfo: true,
							valueTypeBillingInfo: true,
							cards: {
								select: {
									nameCard: true,
									idCard: true,
								}
							},
							categories: {
								select: {
									nameCategory: true,
									idCategory: true,
								}
							}
						}
					}
				}
			})

			res.send(listBills);
		}
	}
});

export { listBillsRoute }
