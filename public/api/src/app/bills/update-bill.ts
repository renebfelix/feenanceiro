import { Request, Response, Router } from "express";
import { userDataToken } from "../../../utils/userDatatoken";
import { isEmpty } from "../../../utils/isEmpty";
import { errorHandler } from "../../../utils/errorsHandlers";
import { database } from "../../prisma/client";
import { BodyBillProps } from "./types/types";
import { findInfoBill, fieldsBillInfo, parcelsFieldsValueBill } from "./utils";

const updateBillRoute = Router();

updateBillRoute.put('/app/bill/:uuidBillingInfo', async (req: Request, res: Response) => {
	const { uuid } = userDataToken(req.headers.authorization ?? '');
	const { uuidBillingInfo } = req.params;
	const bodyProps : BodyBillProps = req.body;
	const searchBill = await findInfoBill(uuidBillingInfo, uuid);

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
	} else if (!searchBill){
		res.status(401).send(errorHandler(1, "Gasto não encontrado"));
	}else {
		const updateInfosBill = await database.billings_info.update({
			data: fieldsBillInfo(bodyProps, uuid),
			where: {
				idBillingInfo: uuidBillingInfo,
				idUserBillingInfo: uuid,
				deletedBillingInfo: null
			}
		});

		if(!updateInfosBill){
			res.status(404).send(errorHandler(3, "Gasto não encontrado"));
		} else {
			const deleteValues = await database.billings_values.deleteMany({
				where: {
					idBillingInfoBillingValue: uuidBillingInfo
				}
			});

			if(!deleteValues){
				res.status(404).send(errorHandler(3, "Ococrreu um erro"));
			} else {
				const updateValues = await database.billings_values.createMany({
					data: parcelsFieldsValueBill(bodyProps, updateInfosBill.idBillingInfo),
				});

				if (!updateValues) {
					res.status(401).send(errorHandler(4, "Ocorreu um erro"));
				} else{
					res.send();
				}
			}

		}
	}
});

export { updateBillRoute }
