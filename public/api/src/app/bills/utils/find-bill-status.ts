import moment from "moment";
import { database } from "../../../prisma/client";

export async function findBillStatus(uuidBillingValue: string, uuid: string, date: string){
	try{
		const dateConvert = new Date(moment(new Date(date)).format("YYYY-MM-DD"));

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
	} catch (error: any) {
		throw new Error(error);
	}
}
