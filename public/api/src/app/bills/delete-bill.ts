import { Request, Response, Router } from "express";
import { isEmpty } from "../../../utils/isEmpty";
import { errorHandler } from "../../../utils/errorsHandlers";
import { database } from "../../prisma/client";
import moment from "moment";

const deleteBillRouter = Router();

deleteBillRouter.delete('/app/bill/:uuidBillingValue', async(req: Request, res: Response) => {
	const { uuidBillingValue } = req.params; // ID do Gasto na table values
	const { toDelete } = req.body;

	if (!toDelete || isEmpty([toDelete]) || toDelete !== "VALOR" && toDelete !== "GERAL"){
		res.status(401).send(errorHandler(1, "Parâmetro inválido"))
	} else {
		let deleteBill;

		if (toDelete === "VALOR"){
			deleteBill = await database.billings_values.update({
				data: {
					deletedBillingValue: new Date(moment().format("YYYY-MM-DD H:mm:ss")),
				},
				where: {
					idBillingValue: uuidBillingValue,
				}
			});

		} else if (toDelete === "GERAL") {
			deleteBill = await database.billings_values.update({
				data: {
					billings_info: {
						update:{
							deletedBillingInfo: new Date(moment().format("YYYY-MM-DD H:mm:ss")),
						}
					}
				},
				where: {
					idBillingValue: uuidBillingValue,
				}
			});
		}

		if (!deleteBill){
			res.status(401).send(errorHandler(3, "Ocorreu um erro"))
		} else{
			res.send();
		}
	}
});

export { deleteBillRouter }
