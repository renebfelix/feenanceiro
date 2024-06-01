import { Request, Response, Router } from "express";
import { database } from "../../prisma/client";
import { userDataToken } from "../../../utils/userDatatoken";
import { errorHandler } from "../../../utils/errorsHandlers";

const createResponsableRouter = Router();

createResponsableRouter.post(`/app/responsable`, async(req: Request, res: Response) => {
	const { name } = req.body;
	const { uuid } = userDataToken(req.headers.authorization ?? '');

	if (!name) {
		res.status(400).send(errorHandler(1, "Preencha todos os campos"));
	} else {
		const createResponsable = await database.responsables.create({
			data: {
				nameResponsable: name,
				idUserResponsable: uuid,
				isDefaultResponsable: false
			}
		});

		if (!createResponsable) {
			res.status(400).send(errorHandler(1, "Ocorreu um erro"));
		} else {
			res.status(201).send();
		}
	}
});

export { createResponsableRouter };
