import { Request, Response, Router } from "express";
import { findResponsable } from "./utils/findResponsable";
import { userDataToken } from "../../../utils/userDatatoken";
import { errorHandler } from "../../../utils/errorsHandlers";
import { database } from "../../prisma/client";
import { isEmpty } from "../../../utils/isEmpty";

const editResponsableRoute = Router();

editResponsableRoute.put(`/app/responsable/:uuidResponsable`, async (req: Request, res: Response) => {
	const { uuidResponsable } = req.params;
	const { uuid } = userDataToken(req.headers.authorization ?? '');
	const { name } = req.body;

	const selectResponsable = await findResponsable(uuidResponsable, uuid);

	if (!selectResponsable) {
		res.status(401).send(errorHandler(2, 'Sem permissão'));
	} else if (isEmpty([name])){
		res.status(401).send(errorHandler(2, 'Preencha todos os campos'));
	} else {
		const edit = await database.responsables.update({
			where: {
				idResponsable: uuidResponsable
			},
			data: {
				nameResponsable: {
					set: name
				}
			}
		});

		if (!edit) {
			res.status(401).send(errorHandler(2, 'Ocorreu um erro'));
		} else {
			res.send();
		}
	}
})

export { editResponsableRoute }
