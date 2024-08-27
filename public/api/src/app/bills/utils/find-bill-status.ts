import moment from "moment";
import { database } from "../../../prisma/client";

export async function findBillStatus(uuidBillingValue: string, uuid: string, date: string){
	try{
		const dateConvert = new Date(moment(date).format("YYYY-MM-DD"));

		console.log(dateConvert);

		const findStatus = await database.billings_status.findFirst({
			where: {
				idBillingValueBillingStatus: uuidBillingValue,
				dateBillingStatus: {
					equals: dateConvert,
				},
				billings_values:{
					billings_info: {
						idUserBillingInfo: uuid,
					}
				}
			}
		});

		console.log(findStatus);

		return findStatus;
	} catch (error: any) {
		throw new Error(error);
	}
}
