import { Request, Response, Router } from "express";
import { userDataToken } from "../../../utils/userDatatoken";
import { errorHandler } from "../../../utils/errorsHandlers";
import { regexDate } from "../../../utils/regex";
import { getBillValues } from "./utils/get-bill-values";
import { calculateMeta } from "./utils/calculate-meta";
import { FilterProps } from "./types/types";

const listBillsRoute = Router();

listBillsRoute.get('/app/bills', async(req: Request, res: Response) => {
	const filters: FilterProps = req.query;
	const { uuid } = userDataToken(req.headers.authorization ?? '');

	if (!filters.period){
		res.status(401).send(errorHandler(2, "Parâmetros insuficientes"));
	} else {
		if (!regexDate(filters.period.toString())){
			res.status(401).send(errorHandler(2, "Período informado inválido"));
		} else {
			const listBills = await getBillValues(filters, uuid);

			if (!listBills){
				res.status(401).send(errorHandler(3, "Ocorreu um erro"));
			} else {

				let formatAPi = listBills.map((bill) => {
					return {
						id: bill.idBillingValue,
						value: bill.valueBillingValue,
						dateValue: bill.dateBillingValue,
						info: {
							id: bill.billings_info.idBillingInfo,
							title: bill.billings_info.descriptionBillingInfo,
							description: bill.billings_info.observationBillingInfo,
							division: bill.billings_info.divisionBillingInfo,
							value: bill.billings_info.valueBillingInfo,
							dateInfo: bill.billings_info.dataBillingInfo,
							dateCreationInfo: bill.billings_info.dataCriacaoBillingInfo,
							type: bill.billings_info.typeBillingInfo,
							method: bill.billings_info.valueTypeBillingInfo,
							statusPayment: bill.billings_status[0]?.statusBillingStatus ?? "EM_ABERTO"
						},
						parcel: {
							total: bill.billings_info.parcelBillingInfo,
							current: bill.numberParcelBillingValue,
						},
						category: {
							id: bill.billings_info.categories.idCategory,
							name: bill.billings_info.categories.nameCategory,
						},
						responsable: {
							id: bill.responsables.idResponsable,
							name: bill.responsables.nameResponsable,
						},
						payment: {
							id: bill.billings_info.cards.idCard,
							name: bill.billings_info.cards.nameCard,
						}
					}
				})

				res.send({
					meta: calculateMeta(listBills),
					items: formatAPi
				});
			}
		}
	}
});

export { listBillsRoute }
