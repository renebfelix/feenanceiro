import { Request, Response, Router } from "express";
import { userDataToken } from "../../../utils/userDatatoken";
import { isEmpty } from "../../../utils/isEmpty";
import { errorHandler } from "../../../utils/errorsHandlers";
import { database } from "../../prisma/client";
import { findCard } from "./findCard";

const updateCardRoute = Router();

updateCardRoute.put(`/app/card/:uuidCard`, async(req: Request, res: Response) => {
	const { uuidCard } = req.params;
	const { uuid } = userDataToken(req.headers.authorization ?? '');
	const { name, type, dueCard, closingDate, limit } = req.body;
	const selectCards = await findCard(uuidCard, uuid);

	if (isEmpty([name, type, dueCard, closingDate, limit])){
		res.status(401).send(errorHandler(1, "Preencha todos os campos"));
	} else {
		if (!selectCards) {
			res.status(401).send(errorHandler(1, "Sem permissão"));
		} else {
			const updateCard = await database.cards.update({
				data: {
					nameCard: name,
					typeCard: type,
					dueDateCard: dueCard,
					closingDateCard: closingDate,
					limitCard: limit,
					idUserCard: uuid
				},
				where: {
					idCard: uuidCard,
					idUserCard: uuid
				}
			});

			if (!updateCard) {
				res.status(401).send(errorHandler(1, "Ocorreu um erro"));
			} else {
				res.send();
			}
		}
	}
});

export { updateCardRoute }
