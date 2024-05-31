import { NextFunction, Request, Response } from "express";
const jsonwebtoken = require('jsonwebtoken');

const isValidLogin = function(request: Request, response: Response, next: NextFunction){
	const token = request.headers.authorization;

	if(!token) return response.status(401).send({message: "Token not found"});

	try {
		const payload = jsonwebtoken.verify(token, process.env.APP_JWT_PRIVATE);
		const uuid = typeof payload !== "string" && payload.uuid;

		if(!uuid){
			return response.status(401).send({message: "Invalid token"});
		}else{
			return next();
		}
	} catch (error) {
		return response.status(401).send({message: "Error"});
	}
}

export { isValidLogin }
