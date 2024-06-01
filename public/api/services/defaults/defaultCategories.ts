import { database } from "../../src/prisma/client";

export async function createDefaultCategories(uuid: string){
	const categories = await database.categories.createMany({
		data: [
			{
				nameCategory: "Saúde",
				idUserCategory: uuid,
				limitCategory: 100,
			},
			{
				nameCategory: "Lazer",
				idUserCategory: uuid,
				limitCategory: 200,
			},
			{
				nameCategory: "Entretenimento",
				idUserCategory: uuid,
				limitCategory: 300,
			}
		]
	});

	return categories;
}
