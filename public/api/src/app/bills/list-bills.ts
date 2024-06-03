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
					responsableBillingValue: responsable?.toString(),
					deletedBillingValue: null,
					billings_info:{
						idUserBillingInfo: uuid,
						deletedBillingInfo: null,
						typeBillingInfo: type?.toString(),
						categoryBillingInfo: category?.toString(),
						valueTypeBillingInfo: paymentValue?.toString(),
						paymentBillingInfo: payment?.toString(),
					},
					OR: [
						{
							dateBillingValue: {
								gte: dateSplit && new Date(dateSplit[1]+'-'+dateSplit[0]+'-01'),
								lte: dateSplit && new Date(dateSplit[1]+'-'+dateSplit[0]+'-31'),
							},
						},
						{
							dateBillingValue: null
						}
					]
				},
				select: {
					valueBillingValue: true,
					idBillingValue: true,
					responsableBillingValue: true,
					numberParcelBillingValue: true,
					dateBillingValue: true,
					billings_status:{
						select:{
							statusBillingStatus: true
						}
					},
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

			if (!listBills){
				res.status(401).send(errorHandler(3, "Ocorreu um erro"));
			} else {
				let totalGasto = 0;
				let totalEntradas = 0;
				let totalPago = 0;

				listBills.map((bill) => {
					if (bill.billings_info.valueTypeBillingInfo === "SAIDA"){
						totalGasto = totalGasto + bill.valueBillingValue

						if (bill?.billings_status[0]?.statusBillingStatus === "PAGO"){
							totalPago = totalPago + bill.valueBillingValue;
						}
					} else {
						totalEntradas = totalEntradas + bill.valueBillingValue
					}
				});

				res.send({
					meta:{
						totalGasto,
						totalEntradas,
						totalPago,
						saldo: totalEntradas - totalGasto,
					},
					items: listBills
				});
			}
		}
	}
});

export { listBillsRoute }
