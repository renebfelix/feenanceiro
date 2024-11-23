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
				idUser: true,
				fullnameUser: true,
				emailUser: true,
				photoUser: true,
				usernameUser: true,
				limitUser: true
			}
		});

		if (!editUser) {
			res.status(401).send();
		} else {
			const rename = {
				id: editUser.idUser,
				fullname: editUser.fullnameUser,
				email: editUser.emailUser,
				photo: editUser.photoUser,
				username: editUser.usernameUser,
				limit: editUser.limitUser
			}

			res.send(rename);
		}
	}

});

export { editUserRouter }
