import { Request, Response, Router } from "express";
import { userDataToken } from "../../../utils/userDatatoken";
import { isEmpty } from "../../../utils/isEmpty";
import { errorHandler } from "../../../utils/errorsHandlers";
import { findValueBill, findBillStatus } from "./utils";
import { database } from "../../prisma/client";
import moment from "moment";

const statusBillRoute = Router();

statusBillRoute.post('/app/bill/:uuidBillingValue', async(req: Request, res: Response) => {
	const { uuid } = userDataToken(req.headers.authorization ?? '');
	const { uuidBillingValue } = req.params;
	const { status, date } = req.body;

	if (isEmpty([status, date]) || status !== "EM_ABERTO" && status !== "PAGO"){
		res.status(401).send(errorHandler(1, "Parâmetros inválidos"));
	} else {
		const searchBill = await findValueBill(uuidBillingValue, uuid);

		if (!searchBill) {
			res.status(401).send(errorHandler(1, "Sem permissão"));
		} else {
			const searchStatus = await findBillStatus(searchBill.idBillingValue, uuid, date);
			let queryCreateOrUpdate;

			// Caso não haja nenhuma informação sobre status de pagamento na tabela, a conta é considerada "EM_ABERTO" por padrão
			if (!searchStatus) {
				queryCreateOrUpdate = await database.billings_status.create({
					data: {
						responsableBillingStatus: searchBill.responsableBillingValue,
						statusBillingStatus: status,
						dateBillingStatus: new Date(moment(new Date(date)).format("YYYY-MM-DD H:mm:ss")),
						idBillingValueBillingStatus: searchBill.idBillingValue,
					},
					select: {
						idBillingStatus: true,
						statusBillingStatus: true,
						idBillingValueBillingStatus: true,
						billings_values: {
							select: {
								valueBillingValue: true
							}
						}
					}
				});
			} else {
				queryCreateOrUpdate = await database.billings_status.update({
					data: {
						statusBillingStatus: status
					},
					where: {
						idBillingStatus: searchStatus.idBillingStatus
					},
					select: {
						idBillingStatus: true,
						statusBillingStatus: true,
						idBillingValueBillingStatus: true,
						billings_values: {
							select: {
								valueBillingValue: true
							}
						}
					}
				})
			}

			if (!queryCreateOrUpdate){
				res.status(401).send(errorHandler(3, "Ocorreu um erro"));
			} else {
				const rename = {
					id: queryCreateOrUpdate.idBillingValueBillingStatus,
					status: queryCreateOrUpdate.statusBillingStatus,
					value: queryCreateOrUpdate.billings_values.valueBillingValue
				}

				res.send(rename);
			}
		}
	}
});

export { statusBillRoute }
