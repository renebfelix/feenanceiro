import { Request, Response, Router } from "express";
import { userDataToken } from "../../../utils/userDatatoken";
import { findBank } from "./findBank";
import { errorHandler } from "../../../utils/errorsHandlers";
import { database } from "../../prisma/client";
import moment from "moment";

const deleteBankRoute = Router();

deleteBankRoute.delete('/app/bank/:uuidBank', async(req: Request, res: Response) => {
	const { uuid } = userDataToken(req.headers.authorization ?? '');
	const { uuidBank } = req.params;
	const selectBank = await findBank(uuidBank, uuid);

	if (!selectBank) {
		res.status(401).send(errorHandler(1, "Sem permissão"));
	} else {
		const deleteBank = await database.cards.update({
			data: {
				deletedCard: new Date(moment().format("YYYY-MM-DD H:mm:ss")),
			},
			where: {
				idCard: uuidBank,
				idUserCard: uuid
			}
		});

		if (!deleteBank) {
			res.status(401).send(errorHandler(1, "Sem permissão"));
		} else {
			res.send();
		}
	}
});

export { deleteBankRoute }
