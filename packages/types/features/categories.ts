import { LoadingProps } from "../general/loading";

export type CategoriesPorps = {
	idCategory: string;
	nameCategory: string;
	limitCategory: number;
}

export type CategoriesFetchProps = {
	data: Array<CategoriesPorps>;
	status: LoadingProps;
}
