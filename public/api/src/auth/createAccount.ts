import { Request, Response, Router } from "express";
import { database } from "../prisma/client";
import { createPassword } from "../../utils/generatePassword";
import { errorHandler } from "../../utils/errorsHandlers";
import { createDefaultCategories } from "../../services/defaults/defaultCategories";
import { createDefaultResponsable } from "../../services/defaults/defaultResponsables";

const createRouter = Router();

createRouter.post(`/auth/create-account`, async (req: Request, res: Response) => {
	const {
		fullname,
		username,
		password,
		email,
		limit
	} = req.body;

	const checkUSer = await database.users.findFirst({
		where: {
			OR: [
				{usernameUser: {equals: username}},
				{emailUser: {equals: email}}
			]
		}
	})

	if (!checkUSer){
		const createAccount = await database.users.create({
			data:{
				fullnameUser: fullname,
				usernameUser: username,
				passwordUser: createPassword(password),
				emailUser: email,
				limitUser: limit,
			}
		});

		if (createAccount){
			const categories = await createDefaultCategories(createAccount.idUser);
			const responsables = await createDefaultResponsable(
				createAccount.idUser,
				createAccount.fullnameUser,
				createAccount.emailUser
			);

			if (categories && responsables){
				res.status(201).send({
					message: "Criado com sucesso!"
				});
			} else {
				res.status(401).send(errorHandler(6, "Ocorreu um erro"));
			}

		}else {
			res.status(401).send(errorHandler(6, "Ocorreu um erro"));
		}
	} else {
		res.status(401).send(errorHandler(5, "Usuário já existente"));
	}
})

export {createRouter};
