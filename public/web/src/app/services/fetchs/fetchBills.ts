"use client";

import { META_BILLS_INITITAL_STATE } from "@feenanceiro/context";
import { BillsFetchProps } from "@feenanceiro/types";
import { getFetch } from "./getFetch";
import moment from "moment";
import { getFetchGeneral } from "./getFetchGeneral";

interface Filters {
	period: string;
	category?: string;
	responsable?: string;
	payment?: string;
	method?: string;
	type?: string;
}

export async function fetchBills(searchParams: any): Promise<BillsFetchProps>{
	const period = searchParams?.get('period') ?? moment().format("YYYY-MM");
	const category = searchParams?.get('category') ?? undefined;
	const responsable = searchParams?.get('responsable') ?? undefined;
	const payment = searchParams?.get('payment') ?? undefined;
	const method = searchParams?.get('method') ?? undefined;
	const type = searchParams?.get('type') ?? undefined;

	let paramsUrl = period ? "period="+period : "";
		paramsUrl += category ? "&category="+category : "";
		paramsUrl += responsable ? "&responsable="+responsable : "";
		paramsUrl += payment ? "&payment="+payment : "";
		paramsUrl += type ? "&type="+type : "";
		paramsUrl += method ? "&paymentValue="+method : "";

	const response = await getFetchGeneral({
		method: "GET",
		url: `/app/bills?${paramsUrl}`
	});

	if(response.ok){
		const data = await response.json();

		return {
			items: data.items,
			meta: data.meta,
			status: {
				hasError: false,
				isLoading: false
			}
		}
	} else {
		return {
			items: [],
			meta: META_BILLS_INITITAL_STATE,
			status: {
				hasError: true,
				isLoading: false
			}
		}
	}
}
