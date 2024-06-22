"use client";

import { META_BILLS_INITITAL_STATE } from "@feenanceiro/context";
import { BillsFetchProps } from "@feenanceiro/types";
import { getFetch } from "./getFetch";

interface Filters {
	period: string;
	category?: string;
	responsable?: string;
	payment?: string;
	method?: string;
	type?: string;
}

export async function fetchBills({ period, category, responsable, payment, type, method }: Filters): Promise<BillsFetchProps>{

	let paramsUrl = period ? "period="+period : "";
		paramsUrl += category ? "&category="+category : "";
		paramsUrl += responsable ? "&responsable="+responsable : "";
		paramsUrl += payment ? "&payment="+payment : "";
		paramsUrl += type ? "&type="+type : "";
		paramsUrl += method ? "&paymentValue="+method : "";

	const billsData = await getFetch({
		method: "GET",
		url: `/app/bills?${paramsUrl}`
	});

	if (billsData.code || billsData === undefined){
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
