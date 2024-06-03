import { database } from "../../../prisma/client";

export async function findValueBill(uuidBillingValue: string, uuid: string){
	const findValueBill = await database.billings_values.findFirst({
		where: {
			idBillingValue: uuidBillingValue,
			billings_info: {
				idUserBillingInfo: uuid
			}
		}
	});

	return findValueBill;
}
