export type MetaTagsBillsProps = {
	totalGasto: number;
	totalEntradas: number;
	totalPago: number;
}

export type BillProps = {
	id: string;
	value: number;
	dateValue?: Date;
	info: {
		id: string;
		title: string;
		description: string;
		division: number;
		value: number;
		dateInfo: Date;
		dateCreationInfo: Date;
		statusPayment: "EM_ABERTO" | "PAGO",
		type: "UNICA" | "FIXA" | "PARCELADA",
		method: "SAIDA" | "ENTRADA",
	},
	responsable: {
		id: string;
		name: string;
	},
	parcel: {
		current: number;
		total: number;
	},
	payment: {
		id: string;
		name: string;
	},
	category: {
		id: string;
		name: string;
	}
}

export interface BillsProps {
	meta: MetaTagsBillsProps,
	items: Array<BillProps>,
}
