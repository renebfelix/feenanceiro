import moment from "moment";
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

export async function findStatus(uuidBillingValue: string, uuid: string, date: string){
	const dateConvert = new Date(moment(date).format("YYYY-MM-DD"));

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
