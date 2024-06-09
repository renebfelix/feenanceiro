import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../utils/errorsHandlers";
const jsonwebtoken = require('jsonwebtoken');

const isValidLogin = function(request: Request, response: Response, next: NextFunction){
	const token = request.headers.authorization;
	const newToken = token?.split(" ") ?? '';

	if(!token) return response.status(401).send(errorHandler(1, "Token not found"));

	try {
		const payload = jsonwebtoken.verify(newToken[1], process.env.APP_JWT_PRIVATE);
		const uuid = typeof payload !== "string" && payload.uuid;
		const email = typeof payload !== "string" && payload.email;

		if(!uuid || !email){
			return response.status(401).send(errorHandler(1, "Invalid Token"));
		}else{
			return next();
		}
	} catch (error) {
		return response.status(401).send(errorHandler(1, "Erro! Try again"));
	}
}

export { isValidLogin }
