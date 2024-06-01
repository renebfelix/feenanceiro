import { database } from "../../prisma/client";

export async function findBank(uuidCard: string, uuidUser: string){
	const findBank = await database.cards.findFirst({
		where: {
			idCard: uuidCard,
			idUserCard: uuidUser,
			deletedCard: null,
			typeCard: "CORRENTE"
		}
	});

	return findBank;
}
