import { Request, Response, Router } from "express";
import { database } from "../prisma/client";
import { createPassword } from "../../utils/generatePassword";
import { errorHandler } from "../../utils/errorsHandlers";
import { createDefaultCategories } from "../../services/defaults/defaultCategories";
import { createDefaultResponsable } from "../../services/defaults/defaultResponsables";
import { isEmpty } from "../../utils/isEmpty";

const createRouter = Router();

createRouter.post(`/auth/create-account`, async (req: Request, res: Response) => {
	const {
		fullname,
		username,
		password,
		email,
		limit,
		confirmPassword
	} = req.body;

	if (isEmpty([fullname, username, password, email])) {
		res.status(401).send(errorHandler(1, "Preencha todos os campos"));
	} else if (confirmPassword !== password){
		res.status(401).send(errorHandler(2, "Senhas divergentes"));
	} else {
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
					res.status(401).send(errorHandler(3, "Ocorreu um erro"));
				}

			}else {
				res.status(401).send(errorHandler(4, "Ocorreu um erro"));
			}
		} else {
			res.status(401).send(errorHandler(5, "Usuário já existente"));
		}
	}
})

export {createRouter};
