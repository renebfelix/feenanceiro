import { META_BILLS_INITITAL_STATE } from "@feenanceiro/context";
import { BillsFetchProps } from "@feenanceiro/types";
import { getFetch } from "./getFetch";

interface Filters {
	period: string;
}

export async function fetchBills({ period }: Filters): Promise<BillsFetchProps>{
	const billsData = await getFetch({
		method: "GET",
		url: `/app/bills?period=${period}`
	});

	if (billsData.code){
		return {
			items: [],
			meta: META_BILLS_INITITAL_STATE,
			status: {
				hasError: true,
				isLoading: false
			}
		}
	} else {
		return {
			items: billsData.items,
			meta: billsData.meta,
			status: {
				hasError: false,
				isLoading: false
			}
		}
	}

}
