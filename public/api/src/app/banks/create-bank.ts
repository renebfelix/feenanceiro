import { Request, Response, Router } from "express";
import { userDataToken } from "../../../utils/userDatatoken";
import { isEmpty } from "../../../utils/isEmpty";
import { errorHandler } from "../../../utils/errorsHandlers";
import { database } from "../../prisma/client";

const createBankRouter = Router();

createBankRouter.post('/app/bank', async(req: Request, res: Response) => {
	const { uuid } = userDataToken(req.headers.authorization ?? '');
	const { name, type } = req.body;

	if (isEmpty([name, type])) {
		res.status(401).send(errorHandler(1, "Preencha todos os campos"));
	} else {
		const createBank = await database.cards.create({
			data: {
				nameCard: name,
				typeCard: type,
				idUserCard: uuid,
			},
			select: {
				idCard: true,
				nameCard: true
			}
		});

		if (!createBank) {
			res.status(401).send(errorHandler(2, "Ocorreu um erro"));
		} else {
			res.status(201).send(createBank);
		}
	}
});

export { createBankRouter }
