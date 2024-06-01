import { Request, Response, Router } from "express";
import { database } from "../../prisma/client";
import { userDataToken } from "../../../utils/userDatatoken";
import moment from "moment";
import { findCategory } from "./findCategory";
import { errorHandler } from "../../../utils/errorsHandlers";

const deleteCategoryRoute = Router();

deleteCategoryRoute.delete(`/app/category/:uuidCategory`, async(req: Request, res: Response) => {
	const { uuid } = userDataToken(req.headers.authorization ?? '');
	const { uuidCategory } = req.params;
	const selectCatergory = await findCategory(uuidCategory, uuid);

	if (!selectCatergory){
		res.status(401).send(errorHandler(1, "Sem permissão"));
	} else {
		const deleteCategory = await database.categories.update({
			data: {
				deletedCategory: new Date(moment().format("YYYY-MM-DD H:mm:ss")),
			},
			where: {
				idCategory: uuidCategory,
				idUserCategory: uuid
			}
		});

		if (!deleteCategory){
			res.status(401).send(errorHandler(1, "Ocorreu um erro"));
		} else {
			res.send();
		}
	}

});

export { deleteCategoryRoute }
