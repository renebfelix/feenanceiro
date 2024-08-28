import { Request, Response, Router } from "express";
import { errorHandler } from "../../../utils/errorsHandlers";
import { database } from "../../prisma/client";
import moment from "moment";
import { isEmpty } from "../../../utils/isEmpty";

const stopBillRouter = Router();

stopBillRouter.post('/app/stop-bill/:uuidBillingValue', async(req: Request, res: Response) => {
	const { uuidBillingValue } = req.params; // ID do Gasto na table values
	const { date } = req.body;

	console.log(date);

	if (!date || isEmpty([date])){
		res.status(401).send(errorHandler(1, "Parâmetro inválido"))
	} else {
		const stopBill = await database.billings_values.update({
			data: {
				stopBillingValue: new Date(moment(new Date(date+"-31")).format("YYYY-MM-DD")),
			},
			where: {
				idBillingValue: uuidBillingValue,
			}
		});

		if (!stopBill){
			res.status(401).send(errorHandler(1, "Ocorreu um erro"))
		} else{
			res.send();
		}
	}

});

export { stopBillRouter }
