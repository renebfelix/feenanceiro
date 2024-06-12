import { Request, Response, Router } from "express";
import { userDataToken } from "../../../utils/userDatatoken";
import { database } from "../../prisma/client";
import { errorHandler } from "../../../utils/errorsHandlers";

const listBanksRouter = Router();

listBanksRouter.get('/app/banks', async(req: Request, res: Response) => {
	const { uuid } = userDataToken(req.headers.authorization ?? '');

	const listBanks = await database.cards.findMany({
		where: {
			idUserCard: uuid,
			deletedCard: null,
			typeCard: "CORRENTE"
		},
		select: {
			idCard: true,
			nameCard: true,
		},
		orderBy: {
			nameCard: "asc"
		}
	});

	if (!listBanks) {
		res.status(401).send(errorHandler(1, "Ocorreu um erro"));
	} else {
		let renameBank = listBanks.map((item) => {
			return {
				idBank: item.idCard,
				nameBank: item.nameCard
			}
		});

		res.send(renameBank);
	}
})

export { listBanksRouter }
