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
				res.send({
					meta: calculateMeta(listBills),
					items: listBills
				});
			}
		}
	}
});

export { listBillsRoute }
