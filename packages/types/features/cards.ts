import { LoadingProps } from "../general/loading";

export type CardsProps = {
	idCard: string;
	nameCard: string;
	closingDateCard: number;
	dueDateCard: number;
	limitCard: number;
}

export type CardsFetchProps = {
	data: Array<CardsProps>,
	status: LoadingProps
}
