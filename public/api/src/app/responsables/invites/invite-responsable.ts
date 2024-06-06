import { Request, Response, Router } from "express";
import { userDataToken } from "../../../../utils/userDatatoken";
import { database } from "../../../prisma/client";
import { isEmpty } from "../../../../utils/isEmpty";
import { errorHandler } from "../../../../utils/errorsHandlers";

const inviteResponsableRouter = Router();

inviteResponsableRouter.post('/app/responsable/invite', async (req: Request, res: Response) => {
	const { uuidResponsable, invite, email } = req.body;
	const { uuid } = userDataToken(req.headers.authorization ?? '');

	if (isEmpty([uuidResponsable, invite, email])){
		res.status(401).send(errorHandler(1, "Parâmetros inválidos"));
	} else {
		const getResponsable = await database.responsables.findFirst({
			where: {
				idResponsable: uuidResponsable,
				idUserResponsable: uuid,
				deletedResponsable: null,
			}
		});

		if (!getResponsable) {
			res.status(401).send(errorHandler(1, "Sem permissão"));
		} else {
			let dataInvite = invite === true ? {
				isInvitedResponsable: true,
			} :
			{
				isInvitedResponsable: false,
			};

			const getUserInvetedInfo = await database.users.findFirst({
				where: {
					emailUser: email,
					deletedUser: null,
					blockedUser: null
				}
			})

			if (!getUserInvetedInfo){
				res.status(401).send(errorHandler(1, "Usuário não encontrado"));
			} else {
				const sendInvite = await database.responsables.update({
					data: {
						...dataInvite,
						acceptedInviteResponsable: null,
						emailResponsable: email,
						idUserInvitedResponsalbe: getUserInvetedInfo?.idUser
					},
					where: {
						idResponsable: uuidResponsable,
						idUserResponsable: uuid,
						deletedResponsable: null,
					}
				});

				if (!sendInvite){
					res.status(401).send(errorHandler(1, "Ocorreu um erro"));
				} else {
					res.send();
				}
			}
			}

	}
})

export { inviteResponsableRouter }
