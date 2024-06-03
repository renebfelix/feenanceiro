export interface BodyBillProps {
	valueType: "ENTRADA" | "SAIDA";
	description: string;
	value: number;
	date: string;
	type: "FIXA" | "UNICA" | "PARCELADA";
	parcels: number;
	payment: string;
	category: string;
	division: Array<{
		value: string;
		label: string;
	}>;
	observation: string;
}
