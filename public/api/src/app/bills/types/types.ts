export interface BodyBillProps {
	valueType: "ENTRADA" | "SAIDA";
	description: string;
	value: number;
	date: string;
	type: "FIXA" | "UNICA" | "PARCELADA";
	parcels: number;
	payment: string;
	category: string;
	division: Array<string>;
	observation: string;
}

export interface FilterProps {
	period?: string;
	responsable?: string;
	payment?: string;
	category?: string;
	type?: string;
	paymentValue?: number;
}
