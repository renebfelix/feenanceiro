import { Request, Response, Router } from "express";
import { database } from "../../prisma/client";
import { errorHandler } from "../../../utils/errorsHandlers";
import moment from "moment";

const verifyPasswordRouter = Router();

verifyPasswordRouter.get(`/password/verify-reset`, async(req: Request, res: Response) => {
	const { uuid, email } = req.query;

	if (!uuid){
		res.status(400).send(errorHandler(3, "Preencha todos os campos"));
	}

	const isValidReset = await database.reset_password.findFirst({
		where: {
			idReset: {equals: `${uuid}`},
			users: {
				emailUser: `${email}`
			},
			finishedReset: false,
			dateExpirationReset: {
				gte: moment().unix()
			}
		}
	});

	if (!isValidReset) {
		res.status(401).send(errorHandler(2, "Link expirado"));
	} else {
		res.send();
	}

})

export { verifyPasswordRouter }
