import { Request, Response, Router } from "express";
import { userDataToken } from "../../../utils/userDatatoken";
import { findCard } from "./findCard";
import { errorHandler } from "../../../utils/errorsHandlers";
import { database } from "../../prisma/client";
import moment from "moment";

const deleteCardRoute = Router();

deleteCardRoute.delete('/app/card/:uuidCard', async(req: Request, res: Response) => {
	const { uuid } = userDataToken(req.headers.authorization ?? '');
	const { uuidCard } = req.params;
	const selectCard = await findCard(uuidCard, uuid);

	if (!selectCard) {
		res.status(401).send(errorHandler(1, "Sem permissão"));
	} else {
		const deleteCard = await database.cards.update({
			data: {
				deletedCard: new Date(moment().format("YYYY-MM-DD H:mm:ss")),
			},
			where: {
				idCard: uuidCard,
				idUserCard: uuid
			}
		});

		if (!deleteCard) {
			res.status(401).send(errorHandler(1, "Sem permissão"));
		} else {
			res.send();
		}
	}
});

export { deleteCardRoute }
