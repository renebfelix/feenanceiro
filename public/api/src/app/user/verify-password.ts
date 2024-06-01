import { Request, Response, Router } from "express";
import { userDataToken } from "../../../utils/userDatatoken";
import { errorHandler } from "../../../utils/errorsHandlers";
import { isEmpty } from "../../../utils/isEmpty";
import { verifyPasswordUtil } from "./verify-password-util";

const verifyPasswordRoute = Router();

verifyPasswordRoute.post('/app/user/verify-password', async(req: Request, res: Response) => {
	const { uuid } = userDataToken(req.headers.authorization ?? '');
	const { password } = req.body;

	if (isEmpty([password])){
		res.status(401).send(errorHandler(1, "Preencha todos os campos"));
	} else {
		const selectPassword = await verifyPasswordUtil(password, uuid);

		if (!selectPassword) {
			res.status(401).send(errorHandler(1, "Senha inválida"));
		} else {
			res.send();
		}
	}

})

export { verifyPasswordRoute }
