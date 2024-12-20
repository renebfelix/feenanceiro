import { getFetch } from "@/app/services/fetchs/getFetch";
import { CardsFetchProps } from "@feenanceiro/types";

export async function fetchCards(): Promise<CardsFetchProps> {
	const cardsData = await getFetch({method: "GET", url: '/app/cards'});

	if (cardsData.error){
		return {
			data: [],
			status: {
				isLoading: false,
				hasError: true,
			}
		}
	} else {
		return {
			data: cardsData.data,
			status: {
				isLoading: false,
				hasError: false,
			}
		}
	}
}
