import { LoadingProps } from "../general/loading";

export type CategoriesPorps = {
	id: string;
	name: string;
	limit: number;
}

export type CategoriesFetchProps = {
	data: Array<CategoriesPorps>;
	status: LoadingProps;
}
