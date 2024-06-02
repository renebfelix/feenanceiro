import moment from "moment";
import { database } from "../../prisma/client";

export async function findBill(uuidBillingValue: string, uuid: string){
	const findBill = await database.billings_values.findFirst({
		where: {
			idBillingValue: uuidBillingValue,
			billings_info: {
				idUserBillingInfo: uuid
			}
		}
	});

	return findBill;
}

export async function findStatus(uuidBillingValue: string, uuid: string, date: string){
	const dateConvert = new Date(moment(date).format("YYYY-MM-DD"));

	console.log(dateConvert);

	const findStatus = await database.billings_status.findFirst({
		where: {
			idBillingValueBillingStatus: uuidBillingValue,
			dateBillingStatus: dateConvert,
			billings_values:{
				billings_info: {
					idUserBillingInfo: uuid,
				}
			}
		}
	});

	return findStatus;
}
