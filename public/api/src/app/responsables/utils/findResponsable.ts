import { database } from "../../../prisma/client";

export async function findResponsable(uuidResponsable: string, uuidUser: string){
	const selectResponsable = await database.responsables.findFirst({
		where: {
			idResponsable: uuidResponsable,
			idUserResponsable: uuidUser,
			deletedResponsable: null
		}
	});

	return selectResponsable;
}
