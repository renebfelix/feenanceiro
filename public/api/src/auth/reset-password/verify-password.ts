import { Request, Response, Router } from "express";
import { database } from "../../prisma/client";
import { errorHandler } from "../../../utils/errorsHandlers";

const verifyPasswordRouter = Router();

verifyPasswordRouter.get(`/password/verify-reset`, async(req: Request, res: Response) => {
	const { uuid } = req.query;

	if (!uuid){
		res.status(400).send(errorHandler(3, "Preencha todos os campos"));
	}

	const isValidReset = await database.reset_password.findFirst({
		where: {
			idReset: {equals: `${uuid}`}
		}
	});

	if (!isValidReset) {
		res.status(401).send(errorHandler(2, "Link expirado"));
	} else {
		res.send();
	}

})

export { verifyPasswordRouter }
