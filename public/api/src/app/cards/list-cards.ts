import { Request, Response, Router } from "express";
import { userDataToken } from "../../../utils/userDatatoken";
import { database } from "../../prisma/client";
import { errorHandler } from "../../../utils/errorsHandlers";

const listCardsRouter = Router();

listCardsRouter.get('/app/cards', async(req: Request, res: Response) => {
	const { uuid } = userDataToken(req.headers.authorization ?? '');

	const listCards = await database.cards.findMany({
		where: {
			idUserCard: uuid,
			deletedCard: null
		},
		select: {
			idCard: true,
			nameCard: true,
			closingDateCard: true,
			dueDateCard: true,
			limitCard: true
		},
		orderBy: {
			nameCard: "asc"
		}
	});

	if (!listCards) {
		res.status(401).send(errorHandler(1, "Ocorreu um erro"));
	} else {
		res.send(listCards);
	}
})

export { listCardsRouter }
