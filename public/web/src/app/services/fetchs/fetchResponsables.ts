import { getFetch } from "@/app/services/fetchs/getFetch";
import { RESPONSABLE_INITIAL_STATE } from "@feenanceiro/context";
import { ResponsableFetchProps} from "@feenanceiro/types";

export async function fetcResponsable(): Promise<ResponsableFetchProps> {
	const responsableData = await getFetch({method: "GET", url: '/app/responsables'});

	if (responsableData.code || responsableData === undefined){
		return {
			data: RESPONSABLE_INITIAL_STATE.data,
			status: {
				isLoading: false,
				hasError: true,
			}
		}
	} else {
		return {
			data: responsableData,
			status: {
				isLoading: false,
				hasError: false,
			}
		}
	}
}
