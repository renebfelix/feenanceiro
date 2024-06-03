import { database } from "../../../prisma/client";

export async function findCategory(uuidCategory: string, uuidUser: string){
	const findCategory = await database.categories.findFirst({
		where: {
			idCategory: uuidCategory,
			idUserCategory: uuidUser,
		}
	});

	return findCategory;
}
