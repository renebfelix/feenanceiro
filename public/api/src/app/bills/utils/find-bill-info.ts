import { database } from "../../../prisma/client";

export async function findInfoBill(uuidBillingInfo: string, uuid: string){
	const findValueBill = await database.billings_info.findFirst({
		where: {
			idBillingInfo: uuidBillingInfo,
			idUserBillingInfo: uuid,
			deletedBillingInfo: null
		}
	});

	return findValueBill;
}
