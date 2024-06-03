import { database } from "../../../prisma/client";

export async function findCard(uuidCard: string, uuidUser: string){
	const findCard = await database.cards.findFirst({
		where: {
			idCard: uuidCard,
			idUserCard: uuidUser,
			deletedCard: null,
			typeCard: "CREDITO"
		}
	});

	return findCard;
}
