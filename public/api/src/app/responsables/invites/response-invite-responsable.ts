import { Request, Response, Router } from "express";
import { userDataToken } from "../../../../utils/userDatatoken";
import { isEmpty } from "../../../../utils/isEmpty";
import { errorHandler } from "../../../../utils/errorsHandlers";
import { database } from "../../../prisma/client";

const responseInviteRouter = Router();

responseInviteRouter.post('/app/invite/response/:uuidResponsable', async (req: Request, res: Response) => {
	const { uuid } = userDataToken(req.headers.authorization ?? '');
	const { response } = req.body;
	const { uuidResponsable } = req.params;

	if (isEmpty([response])) {
		res.status(401).send(errorHandler(1, "Parâmetros inválidos"));
	} else {
		const findInvite = await database.responsables.findFirst({
			where: {
				idUserInvitedResponsalbe: uuid,
				idResponsable: uuidResponsable,
				isInvitedResponsable: true,
				OR: [
					{ acceptedInviteResponsable: false },
					{ acceptedInviteResponsable: null },
				]
			}
		});

		if (!findInvite) {
			res.status(401).send(errorHandler(1, "Convite inválido"));
		} else {
			const responseInvite = await database.responsables.update({
				data: {
					acceptedInviteResponsable: response
				},
				where: {
					idUserInvitedResponsalbe: uuid,
					idResponsable: uuidResponsable,
				}
			});

			if (!responseInvite) {
				res.status(401).send(errorHandler(1, "Convite inválido"));
			} else {
				res.send();
			}
		}
	}
});

export { responseInviteRouter }
