import { Request, Response, Router } from "express";
import { userDataToken } from "../../../utils/userDatatoken";
import { isEmpty } from "../../../utils/isEmpty";
import { database } from "../../prisma/client";
import { errorHandler } from "../../../utils/errorsHandlers";

const createCardRouter = Router();

createCardRouter.post(`/app/card`, async (req: Request, res: Response) => {
	const { uuid } = userDataToken(req.headers.authorization ?? '');
	const { name, type, dueCard, closingDate, limit } = req.body;

	if (isEmpty([name, type, dueCard, closingDate, limit])){
		res.status(400).send(errorHandler(1, "Preencha todos os campos"));
	} else {
		const create = await database.cards.create({
			data: {
				nameCard: name,
				typeCard: type,
				dueDateCard: dueCard,
				closingDateCard: closingDate,
				limitCard: limit,
				idUserCard: uuid
			},
			select: {
				idCard: true,
				nameCard: true,
				typeCard: true,
				dueDateCard: true,
				closingDateCard: true,
				limitCard: true,
			}
		});

		if (!create) {
			res.status(401).send(errorHandler(2, "Ocorreu um erro"));
		} else {
			res.status(201).send(create);
		}
	}

});

export { createCardRouter }
