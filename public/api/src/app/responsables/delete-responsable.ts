import { Request, Response, Router } from "express";
import { userDataToken } from "../../../utils/userDatatoken";
import { findResponsable } from "./findResponsable";
import { errorHandler } from "../../../utils/errorsHandlers";
import { database } from "../../prisma/client";
import moment from "moment";

const deleteResponsableRoute = Router();

deleteResponsableRoute.delete(`/app/responsable/:uuidResponsable`, async(req: Request, res: Response) => {
	const { uuidResponsable } = req.params;
	const { uuid } = userDataToken(req.headers.authorization ?? '');

	const selectResponsable = await findResponsable(uuidResponsable, uuid);

	if (!selectResponsable) {
		res.status(401).send(errorHandler(1, "Sem permissão"));
	} else {
		const deleteResponsable = await database.responsables.update({
			data: {
				deletedResponsable: new Date(moment().format("YYYY-MM-DD H:mm:ss")),
			},
			where: {
				idResponsable: uuidResponsable,
				idUserResponsable: uuid
			}
		});

		if (!deleteResponsable){
			res.status(401).send(errorHandler(1, "Ocorreu um erro"));
		} else {
			res.send();
		}
	}
});

export { deleteResponsableRoute }
