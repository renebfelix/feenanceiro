import { BANKS_INITITAL_STATE } from "@feenanceiro/context";
import { BanksFetchProps} from "@feenanceiro/types";
import { getFetch } from "./getFetch";

export async function fetchBanks(): Promise<BanksFetchProps> {
	const banksData = await getFetch({method: "GET", url: '/app/banks'});

	if (banksData.error){
		return {
			data: BANKS_INITITAL_STATE.data,
			status: {
				isLoading: false,
				hasError: true,
			}
		}
	} else {
		return {
			data: banksData.data,
			status: {
				isLoading: false,
				hasError: false,
			}
		}
	}
}
