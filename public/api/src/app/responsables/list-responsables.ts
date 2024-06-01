import { Request, Response, Router } from "express";
import { userDataToken } from "../../../utils/userDatatoken";
import { database } from "../../prisma/client";
import { errorHandler } from "../../../utils/errorsHandlers";

const listResponsablesRouter = Router();

listResponsablesRouter.get(`/app/responsables`, async (req: Request, res: Response) =>{
	const { uuid } = userDataToken(req.headers.authorization ?? '');

	const listResponsables = await database.responsables.findMany({
		where: {
			idUserResponsable: uuid,
			deletedResponsable: null
		},
		select: {
			idResponsable: true,
			nameResponsable: true,
			isDefaultResponsable: true
		}
	});

	if (!listResponsables) {
		res.status(401).send(errorHandler(1, "Ocorreu um erro"))
	} else {
		res.send(listResponsables);
	}

});

export { listResponsablesRouter };
