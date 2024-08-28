import { getFetchGeneral } from "@/app/services/fetchs/getFetchGeneral";
import { BillProps } from "@feenanceiro/types";

export async function hadleStopBill(data: any, event: any, bill: BillProps){
	const response = await getFetchGeneral({
		method: "POST",
		data: data,
		url: `/app/stop-bill/${bill.id}`,
	});

	if(!response.ok){
		throw new Error();
	}

	return response;
}
