import { Request, Response, Router } from "express";
import { database } from "../../../prisma/client";
import { userDataToken } from "../../../../utils/userDatatoken";

const listInvitesResponsableRouter = Router();

listInvitesResponsableRouter.get('/app/responsable/invite', async (req: Request, res: Response) => {
	const { email } = req.query;
	const { uuid } = userDataToken(req.headers.authorization ?? '');

	const listInvites = await database.responsables.findMany({
		where: {
			emailResponsable: email?.toString(),
			isInvitedResponsable: true,
			acceptedInviteResponsable: null,
			deletedResponsable: null,
			idUserInvitedResponsalbe: uuid
		},
		select: {
			idResponsable: true,
			nameResponsable: true,
			emailResponsable: true,
			acceptedInviteResponsable: true,
			idUserResponsable: true,
		}
	});

	res.send(listInvites);
})

export { listInvitesResponsableRouter };
