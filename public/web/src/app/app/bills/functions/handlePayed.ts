import { getFetch } from "@/app/services/fetchs";
import { BillProps, MetaTagsBillsProps } from "@feenanceiro/types";
import moment from "moment";

export async function handleMarcarPago(bill: BillProps, filterPeriod: string){
	const response = await getFetch({
		method: "POST",
		url: `/app/bill/${bill.id}`,
		data: {
			"status": bill.info.statusPayment === "EM_ABERTO" ? "PAGO" : "EM_ABERTO",
			"date": `${filterPeriod}-${moment(bill.dateValue ?? bill.info.dateInfo).format("DD")}`,
		}
	});

	if(response.code){
		return false;
	} else {
		return response;
	}
}

export function handleUpdateList(listItems: Array<BillProps>, meta: MetaTagsBillsProps, response: any){
	let metaUpdate = meta;

	if (response.status === "PAGO"){
		metaUpdate.totalPago = meta.totalPago + response.value;
	} else {
		metaUpdate.totalPago = meta.totalPago - response.value;
	}

	let itemsUpdate = listItems.map((item) => {
		if (item.id === response.id){
			return {
				...item,
				info: {
					...item.info,
					statusPayment: response.status
				}
			}
		}

		return item
	});

	return {
		meta: metaUpdate,
		items: itemsUpdate,
	};
}
