import { Request, Response, Router } from "express";
import { userDataToken } from "../../../utils/userDatatoken";
import { database } from "../../prisma/client";
import { isEmpty } from "../../../utils/isEmpty";
import { errorHandler } from "../../../utils/errorsHandlers";

const editUserRouter = Router();

editUserRouter.put('/app/user', async (req: Request, res: Response) => {
	const { uuid } = userDataToken(req.headers.authorization ?? '');
	const { fullname, limit } = req.body;

	if (isEmpty([fullname, limit])) {
		res.status(401).send(errorHandler(2, "Preencha todos os campos"));
	} else {
		const editUser = await database.users.update({
			data: {
				fullnameUser: fullname,
				limitUser: limit
			},
			where: {
				idUser: uuid
			},
			select: {
				fullnameUser: true,
				limitUser: true,
			}
		});

		if (!editUser) {
			res.status(401).send();
		} else {
			res.send(editUser);
		}
	}

});

export { editUserRouter }
