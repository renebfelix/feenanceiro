"use client";
import { getFetchGeneral } from "@/app/services/fetchs/getFetchGeneral";

export async function hadleSubmitResponsable(data: any, event: any){
	const response = await getFetchGeneral({
		method: "POST",
		data: data,
		url: `/app/responsable`,
	});

	if(!response.ok){
		throw new Error();
	}

	return response;
}
