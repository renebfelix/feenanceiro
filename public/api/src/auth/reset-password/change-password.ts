import { Request, Response, Router } from "express";
import { database } from "../../prisma/client";
import { createPassword } from "../../../utils/generatePassword";
import { errorHandler } from "../../../utils/errorsHandlers";

const changePasswordRoute = Router();

changePasswordRoute.put(`/password/change-password`, async (req: Request, res: Response) => {
	const { password } = req.body;
	const { uuid, email } = req.query;

	if (!password || !uuid || !email){
		res.status(400).send(errorHandler(3, "Missing params"));
	} else {
		const isValidReset = await database.reset_password.findFirst({
			where: {
				idReset: {equals: `${uuid}`},
				finishedReset: false
			}
		});

		if(isValidReset){
			const changePasswordUser = await database.users.update({
				where: {
					idUser: `${isValidReset.idUserReset}`,
					emailUser: {equals: `${email}`},
				},
				data: {
					passwordUser: createPassword(password),
				},
			})

			// Desativa a hash que permite alterar a senha pelo link
			const finishHashReset = await database.reset_password.update({
				where: {
					idReset: `${uuid}`
				},
				data: {
					finishedReset: true
				}
			})

			if(!changePasswordUser || !finishHashReset){
				res.status(400).send(errorHandler(1, "Error while trying to update your password"));
			}

			res.send();
		} else {
			res.status(400).send(errorHandler(3, "Invalid params"));
		}
	}
})

export { changePasswordRoute }
