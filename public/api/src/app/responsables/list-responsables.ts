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
		orderBy:{
			nameResponsable: "asc",
		},
		select: {
			idResponsable: true,
			nameResponsable: true,
			emailResponsable: true,
			isDefaultResponsable: true,
			acceptedInviteResponsable: true,
			isInvitedResponsable: true
		}
	});

	if (!listResponsables) {
		res.status(401).send(errorHandler(1, "Ocorreu um erro"))
	} else {
		const rename = listResponsables.map((responsable) => {
			return {
				id: responsable.idResponsable,
				name: responsable.nameResponsable,
				email: responsable.emailResponsable,
				isDefault: responsable.isDefaultResponsable,
				isInvited: responsable.isInvitedResponsable,
				acceptedInvite: responsable.acceptedInviteResponsable,
			}
		})

		res.send(rename);
	}
});

export { listResponsablesRouter };
