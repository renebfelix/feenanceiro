import { Request, Response, Router } from "express";
import { database } from "../../prisma/client";
import { userDataToken } from "../../../utils/userDatatoken";
import { errorHandler } from "../../../utils/errorsHandlers";
import { findCategory } from "./utils/findCategory";
import { isEmpty } from "../../../utils/isEmpty";

const updateCategoryRoute = Router();

updateCategoryRoute.put(`/app/category/:uuidCategory`, async(req: Request, res: Response) => {
	const { uuidCategory } = req.params;
	const { name, limit } = req.body;
	const { uuid } = userDataToken(req.headers.authorization ?? '');
	const selectCatergory = await findCategory(uuidCategory, uuid);

	if (!selectCatergory){
		res.status(401).send(errorHandler(1, "Sem permissão"));
	} else if (isEmpty([name, limit])){
		res.status(401).send(errorHandler(1, "Preencha todos os campos"));
	} else {
		const updateCategory = await database.categories.update({
			data: {
				nameCategory: name,
				limitCategory: limit,
			},
			where: {
				idCategory: uuidCategory,
				idUserCategory: uuid
			}
		});

		if (!updateCategory) {
			res.status(401).send(errorHandler(1, "Ocorreu um erro"));
		} else {
			res.send();
		}
	}
});

export { updateCategoryRoute };
