import moment from "moment";
import { database } from "../src/prisma/client";
import { generateToken } from "./generateToken";
import { generateRefreshToken } from "./generateRefreshToken";

async function refreshTokenUseCase(refresh_token: string){
	const refreshToken = await database.refresh_token.findFirst({
		where:{
			idRefresh: refresh_token,
		}
	});

	if(!refreshToken){
		return "Invalid";
	}

	const token = generateToken(refreshToken.idUserRefresh);

	if (moment().isAfter(moment.unix(refreshToken.expiresInRefresh))){
		await database.refresh_token.deleteMany({
			where: {
				idUserRefresh: refreshToken.idUserRefresh
			}
		});

		const newRefreshToken = await generateRefreshToken(refreshToken.idUserRefresh);

		return {
			token: token,
			newRefreshToken
		}
	}

	return {token};
}

export { refreshTokenUseCase }
