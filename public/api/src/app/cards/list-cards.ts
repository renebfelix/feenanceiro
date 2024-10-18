import { Request, Response, Router } from "express";
import { userDataToken } from "../../../utils/userDatatoken";
import { database } from "../../prisma/client";
import { errorHandler } from "../../../utils/errorsHandlers";
import { CardsProps } from "@feenanceiro/types";

const listCardsRouter = Router();

listCardsRouter.get('/app/cards', async(req: Request, res: Response) => {
	const { uuid } = userDataToken(req.headers.authorization ?? '');

	const listCards = await database.cards.findMany({
		where: {
			idUserCard: uuid,
			deletedCard: null,
			typeCard: "CREDITO"
		},
		select: {
			idCard: true,
			nameCard: true,
			closingDateCard: true,
			dueDateCard: true,
			limitCard: true,
			typeCard: true,
		},
		orderBy: {
			nameCard: "asc"
		}
	});

	if (!listCards) {
		res.status(401).send(errorHandler(1, "Ocorreu um erro"));
	} else {
		let rename = listCards.map((card) => {
			return {
				id: card.idCard,
				name: card.nameCard,
				closingDate: card.closingDateCard,
				dueDate: card.dueDateCard,
				limit: card.limitCard,
				type: card.typeCard
			}
		})
		res.send(rename);
	}
})

export { listCardsRouter }
