import { Request, Response, Router } from "express";
import { userDataToken } from "../../../utils/userDatatoken";
import { database } from "../../prisma/client";

const userDataRoute = Router();

userDataRoute.get('/app/user', async(req: Request, res: Response) => {
	const { uuid } = userDataToken(req.headers.authorization ?? "");

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
	})

	res.send(user);
})

export { userDataRoute }
