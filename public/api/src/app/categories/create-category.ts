import { Request, Response, Router } from "express";
import { userDataToken } from "../../../utils/userDatatoken";
import { database } from "../../prisma/client";
import { errorHandler } from "../../../utils/errorsHandlers";

const categoryRoute = Router();

categoryRoute.post(`/app/category`, async (req: Request, res: Response) => {
	const { uuid } = userDataToken(req.headers.authorization ?? '');
	const { name, limit } = req.body;

	const createCategory = await database.categories.create({
		data: {
			nameCategory: name,
			limitCategory: limit,
			idUserCategory: uuid
		}
	});

	if (!createCategory){
		res.status(401).send(errorHandler(2, 'Erro ao criar categoria'));
	} else {
		res.status(201).send();
	}
})

export { categoryRoute }
