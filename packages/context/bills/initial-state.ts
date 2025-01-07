import { BillProps, MetaTagsBillsProps } from "@feenanceiro/types";

export const META_BILLS_INITITAL_STATE: MetaTagsBillsProps = {
	totalEntradas: 0,
	totalGasto: 0,
	totalPago: 0,
}

export const BILL_INITIAL_STATE: BillProps = {
	category: {
		id: "",
		name: "",
	},
	id: "",
	info: {
		dateCreationInfo: new Date(),
		dateInfo: new Date(),
		description: "",
		division: 0,
		id: "",
		method: "ENTRADA",
		statusPayment: "EM_ABERTO",
		title: "",
		type: "UNICA",
		value: 0,
	},
	parcel: {
		current: 0,
		total: 0,
	},
	payment: {
		id: "",
		name: ""
	},
	responsable: {
		id: "",
		name: "",
	},
	value: 0,
	dateValue: new Date(),
	loading: false,
}
