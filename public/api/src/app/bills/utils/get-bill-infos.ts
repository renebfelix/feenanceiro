import { database } from "../../../prisma/client";
import { FilterProps } from "../types/types";
import { selectFieldsBillInfo } from "./fields-bill-info";

export function getBillInfos(filters: FilterProps, uuidUser: string){
	const { payment, category, type, paymentValue } = filters;

	return database.billings_info.findMany({
		where: {
			idUserBillingInfo: uuidUser,
			deletedBillingInfo: null,
			typeBillingInfo: type?.toString(),
			categoryBillingInfo: category?.toString(),
			valueTypeBillingInfo: paymentValue?.toString(),
			paymentBillingInfo: payment?.toString(),
		},
		select: selectFieldsBillInfo()
	})
}
