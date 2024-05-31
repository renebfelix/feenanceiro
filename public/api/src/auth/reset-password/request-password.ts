import { Request, Response, Router } from "express";
import { database } from "../../prisma/client";
import { errorHandler } from "../../../utils/errorsHandlers";
import moment from "moment";
import { sendEmail } from "../../../utils/sendEmail";

const requestPassword = Router();

requestPassword.post(`/password/reset-password`, async (req: Request, res: Response) => {
	const { email } = req.body;

	if (!email){
		res.status(400).send(errorHandler(1, "Preencha todos os campos"));
	} else {
		const user = await database.users.findFirst({
			select: {
				emailUser: true,
				idUser: true,
				fullnameUser: true,
			},
			where: {
				emailUser: {equals: email}
			}
		});

		if(!user){
			res.status(400).send(errorHandler(1, "Usuário não encontrado"));
		} else {
			// Deleta todos os outros registros de reset não utilizado
			await database.reset_password.deleteMany({
				where: {
					idUserReset: user.idUser,
					finishedReset: false
				}
			});

			// Cria nova hash
			const createHashReset = await database.reset_password.create({
				data: {
					dateExpirationReset: moment().add(1, "day").unix(),
					dateReset: moment().unix(),
					finishedReset: false,
					idUserReset: user.idUser
				}
			});

			if (!createHashReset){
				res.status(400).send(errorHandler(3, "Ocorreu um erro"));
			} else {
				sendEmail(
					[{name: user.fullnameUser, email: user.emailUser}],
					"Alteração de senha - Feenanceiro",
					"d-f6c97dac39004562a535328a1b82d35a",
					{
						name: user.fullnameUser,
						link: `${process.env.APP_URL_APPLICATION}/new-password?uuid=${createHashReset.idReset}&email=${user.emailUser}`
					},
					res
				)

				res.send();
			}
		}
	}

});

export { requestPassword };
