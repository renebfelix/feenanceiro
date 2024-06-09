import { database } from "../../src/prisma/client";

export async function createDefaultResponsable(uuid: string, fullname: string, email: string){
	const responsables = await database.responsables.create({
		data: {
			nameResponsable: fullname,
			idUserResponsable: uuid,
			isDefaultResponsable: true,
			emailResponsable: email
		}
	});

	return responsables;
}
