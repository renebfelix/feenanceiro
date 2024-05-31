import moment from "moment";
import { database } from "../src/prisma/client";

export async function generateRefreshToken(userId: string){
	const createRefreshToken = await database.refresh_token.create({
		data: {
			expiresInRefresh: moment().add(8, 'hours').unix(),
			idUserRefresh: userId
		}
	});

	return createRefreshToken;
}
