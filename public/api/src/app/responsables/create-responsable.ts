import { Request, Response, Router } from "express";
import { database } from "../../prisma/client";
import { userDataToken } from "../../../utils/userDatatoken";
import { errorHandler } from "../../../utils/errorsHandlers";
import { isEmpty } from "../../../utils/isEmpty";

const createResponsableRouter = Router();

createResponsableRouter.post(`/app/responsable`, async(req: Request, res: Response) => {
	const { name, email } = req.body;
	const { uuid } = userDataToken(req.headers.authorization ?? '');

	if (isEmpty([name])) {
		res.status(400).send(errorHandler(1, "Preencha todos os campos"));
	} else {
		const createResponsable = await database.responsables.create({
			data: {
				nameResponsable: name,
				emailResponsable: email,
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
