import { Router, Request, Response } from "express";
import { errorHandler } from "../../utils/errorsHandlers";
import { refreshTokenUseCase } from "../../services/refreshTokenUseCase";

const refreshRouter = Router();

refreshRouter.post(`/auth/refresh_token`, async (req: Request, res: Response) => {
	const { refresh_token } = req.body;

	if (!refresh_token) {
		res.status(403).send(errorHandler(1, "Invalid token"));
	}

	const token = await refreshTokenUseCase(refresh_token);

	if (token === "Invalid"){
		res.status(403).send(errorHandler(2, "Invalid token"))
	} else{
		res.send(
			token
		)
	}
})

export { refreshRouter }
