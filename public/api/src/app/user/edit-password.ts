import { Request, Response, Router } from "express";
import { userDataToken } from "../../../utils/userDatatoken";
import { verifyPasswordUtil } from "./utils/verify-password-util";
import { isEmpty } from "../../../utils/isEmpty";
import { errorHandler } from "../../../utils/errorsHandlers";
import { database } from "../../prisma/client";
import { createPassword } from "../../../utils/generatePassword";

const editPasswordRoute = Router();

editPasswordRoute.put('/app/user/password', async(req: Request, res: Response) => {
	const { uuid } = userDataToken(req.headers.authorization ?? '');
	const { oldPassword, newPassword } = req.body;

	if (isEmpty([oldPassword, newPassword])){
		res.status(401).send(errorHandler(1, "Preencha todos os campos"));
	} else {
		const verifyOldPassword = await verifyPasswordUtil(oldPassword, uuid);

		if (!verifyOldPassword) {
			res.status(401).send(errorHandler(1, "Senha atual incorreta"));
		} else {

			const updatePassword = await database.users.update({
				data: {
					passwordUser: createPassword(newPassword)
				},
				where: {
					idUser: uuid
				}
			})

			if (!updatePassword) {
				res.status(401).send(errorHandler(1, "Ocorreu um erro"))
			} else {
				res.send({
					message: "Atualizado com sucesso"
				});
			}
		}
	}
});

export { editPasswordRoute };
