import { getFetch } from "@/app/services/fetchs/getFetch";
import { CATEGORIES_INITIAL_STATE } from "@feenanceiro/context";
import { CategoriesFetchProps } from "@feenanceiro/types";

export async function fetchCategories(): Promise<CategoriesFetchProps> {
	const categoriesData = await getFetch({method: "GET", url: '/app/categories'});

	if (categoriesData.code || categoriesData === undefined){
		return {
			data: CATEGORIES_INITIAL_STATE.data,
			status: {
				isLoading: false,
				hasError: true,
			}
		}
	} else {
		return {
			data: categoriesData,
			status: {
				isLoading: false,
				hasError: false,
			}
		}
	}
}
