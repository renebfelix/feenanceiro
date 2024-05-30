import { Request, Response, Router } from "express";

const loginRouter = Router();

loginRouter.get(`/login`, (req: Request, res: Response) => {
	res.send({message: "Express + TypeScript Server"});
});

module.exports = loginRouter;
