import { Request, Response, Router } from "express";
import { userDataToken } from "../../../utils/userDatatoken";
import { isEmpty } from "../../../utils/isEmpty";
import { errorHandler } from "../../../utils/errorsHandlers";
import { database } from "../../prisma/client";
import { findBank } from "./utils/findBank";

const updateBankRoute = Router();

updateBankRoute.put(`/app/bank/:uuidBank`, async(req: Request, res: Response) => {
	const { uuidBank } = req.params;
	const { uuid } = userDataToken(req.headers.authorization ?? '');
	const { name } = req.body;
	const selectBank = await findBank(uuidBank, uuid);

	if (isEmpty([name])){
		res.status(401).send(errorHandler(1, "Preencha todos os campos"));
	} else {
		if (!selectBank) {
			res.status(401).send(errorHandler(1, "Sem permissão"));
		} else {
			const updateBank = await database.cards.update({
				data: {
					nameCard: name,
				},
				where: {
					idCard: uuidBank,
					idUserCard: uuid
				}
			});

			if (!updateBank) {
				res.status(401).send(errorHandler(1, "Ocorreu um erro"));
			} else {
				res.send();
			}
		}
	}
});

export { updateBankRoute }
