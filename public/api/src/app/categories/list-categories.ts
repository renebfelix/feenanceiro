import { Request, Response, Router } from "express";
import { database } from "../../prisma/client";
import { userDataToken } from "../../../utils/userDatatoken";
import { errorHandler } from "../../../utils/errorsHandlers";

const listCategoriesRouter = Router();

listCategoriesRouter.get(`/app/categories`, async (req: Request, res: Response) => {
	const { uuid } = userDataToken(req.headers.authorization ?? '');

	const listCategories = await database.categories.findMany({
		select:{
			idCategory: true,
			nameCategory: true,
			limitCategory: true,
		},
		orderBy:{
			nameCategory: "asc",
		},
		where: {
			idUserCategory: uuid,
			deletedCategory: null
		},
	});

	if (!listCategories){
		res.status(401).send(errorHandler(1, "Ocorreu um erro"));
	} else {
		const rename = listCategories.map((category) => {
			return {
				id: category.idCategory,
				name: category.nameCategory,
				limit: category.limitCategory
			}
		})
		res.send(rename);
	}
})

export { listCategoriesRouter }
