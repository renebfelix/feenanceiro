import { Request, Response, Router } from "express";
import { createPassword } from "../../utils/generatePassword";
import { errorHandler } from "../../utils/errorsHandlers";
import { generateRefreshToken } from "../../services/generateRefreshToken";
import { database } from "../prisma/client";
import { generateToken } from "../../services/generateToken";

const loginRouter = Router();

loginRouter.post(`/auth/login`, async (req: Request, res: Response) => {
	let { username, password } = req.body;

	// Invalid body
	if (!username || !password){
		res.status(401).send(errorHandler(1, "Invalid data."));
	}

	const user = await database.users.findFirst({
		where: {
			OR: [
				{ usernameUser: { equals: username } },
				{ emailUser: { equals: username } }
			],
			AND: [
				{ passwordUser: { equals: createPassword(password) } }
			]
		}
	})

	if (!user) {
		res.status(400).send(errorHandler(3, "Usuário ou senha incorreto"));
	} else {
		const token = generateToken(user.idUser);
		const refreshToken = await generateRefreshToken(user.idUser);

		res.send({
			refreshToken,
			token
		});
	}
});

export { loginRouter };
