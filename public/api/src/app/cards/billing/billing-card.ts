import { Request, Response, Router } from "express";
import { userDataToken } from "../../../../utils/userDatatoken";
import { isEmpty } from "../../../../utils/isEmpty";
import { errorHandler } from "../../../../utils/errorsHandlers";
import { getBillValues } from "../../bills/utils/get-bill-values";
import { FilterProps } from "../../bills/types/types";
import { calculateMeta } from "../../bills/utils/calculate-meta";
import { findCard } from "../utils/findCard";

const billingCardRoute = Router();

billingCardRoute.get('/app/card/billing/:uuidCard', async (req: Request, res: Response) => {
	const { uuid } = userDataToken(req.headers.authorization ?? '');
	const { uuidCard } = req.params;
	const { period } : FilterProps = req.query;
	const searchCard = await findCard(uuidCard, uuid);

	if (isEmpty([uuid, uuidCard]) || !period){
		res.status(401).send(errorHandler(1, "Parâmetros inválidos"));
	} else if(!searchCard){
		res.status(404).send(errorHandler(1, "Cartão não encontrado"));
	} else {
		const getBillings = await getBillValues({period, payment: uuidCard}, uuid);

		if (!getBillings){
			res.status(401).send(errorHandler(1, "Ocorreu um erro"));
		} else {
			res.send({
				meta: calculateMeta(getBillings),
				items: getBillings
			});
		}
	}
});

export { billingCardRoute }
