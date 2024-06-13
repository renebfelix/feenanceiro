import { Request, Response, Router } from "express";
import { userDataToken } from "../../../utils/userDatatoken";
import { database } from "../../prisma/client";
import { errorHandler } from "../../../utils/errorsHandlers";
import { isEmpty } from "../../../utils/isEmpty";

const userDataRoute = Router();

userDataRoute.get('/app/user', async(req: Request, res: Response) => {
	const { uuid } = userDataToken(req.headers.authorization ?? "");

	if (isEmpty([`${uuid}`])){
		res.status(401).send(errorHandler(1, "Parâmetros inválidos"));
	} else {
		const user = await database.users.findFirst({
			where: {
				idUser: uuid
			},
			select: {
				idUser: true,
				fullnameUser: true,
				emailUser: true,
				photoUser: true,
				usernameUser: true,
			}
		});

		if (!user) {
			res.status(401).send(errorHandler(1, "Usuário não encontrado"));
		} else {
			const rename = {
				id: user.idUser,
				fullname: user.fullnameUser,
				email: user.emailUser,
				photo: user.photoUser,
				username: user.usernameUser
			}

			res.send(rename);
		}
	}
})

export { userDataRoute }
