import { randomUUID } from "crypto";
import { database } from "../../src/prisma/client";

export async function createDefaultResponsable(uuid: string, fullname: string){
	const responsables = await database.responsables.create({
		data: {
			uuidResponsable: randomUUID(),
			nameResponsable: fullname,
			idUserResponsable: uuid,
			isDefaultResponsable: true
		}
	});

	return responsables;
}
