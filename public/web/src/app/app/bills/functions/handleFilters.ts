"use client";

export function handleFilters(data: any, event: any){
	event.preventDefault();
	let params = "";

	for(const [key, value] of Object.entries(data)){
		if (value !== ""){
			params += `&${key}=${value}`
		}
	}

	return params;
}
