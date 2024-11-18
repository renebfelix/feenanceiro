import { LoadingProps } from "../general/loading";

export type MetaTagsBillsProps = {
	totalGasto: number;
	totalEntradas: number;
	totalPago: number;
}

export type InfoBillProps = {
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
}

export type ResponsableBillProps = {
	id: string;
	name: string;
}

export type ParcelBillProps = {
	current: number;
	total: number;
}

export type PaymentBillProps = {
	id: string;
	name: string;
}

export type CategoryBillProps = {
	id: string;
	name: string;
}

export type BillProps = {
	id: string;
	value: number;
	dateValue?: Date;
	info: InfoBillProps,
	responsable: ResponsableBillProps,
	parcel: ParcelBillProps,
	payment: PaymentBillProps,
	category: CategoryBillProps,
}

export interface BillsFetchProps {
	meta: MetaTagsBillsProps;
	items: Array<BillProps>;
	status: LoadingProps;
}
