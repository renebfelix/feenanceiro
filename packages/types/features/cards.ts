import { LoadingProps } from "../general/loading";

export type CardsProps = {
	id: string;
	name: string;
	closingDate: number;
	dueDate: number;
	limit: number;
}

export type CardsFetchProps = {
	data: Array<CardsProps>,
	status: LoadingProps
}
