"use server";
import { isValidJSON } from "@feenanceiro/utils";
import { cookies } from "next/headers";
interface FetchProps {
	url: string;
	method: "GET" | "POST" | "DELETE"| "PUT" | "PATCH";
	data?: Object
}

export async function getFetch(params: FetchProps){
	const { method, url, data } = params;
	const cookie = cookies().get('token_fee');
	let headersConfig = {};

	try {
		if (!isValidJSON(cookie?.value)){
			return new Error("JSON Token inválido");
		} else{
			if (method === "POST" || method === "PUT"){
				headersConfig = {
					"Content-Type" : "application/json",
				}
			}

			const response = await fetch(`${process.env.API_HOST}${url}`, {
				method: method,
				body: JSON.stringify(data) ?? undefined,
				headers: {
					...headersConfig,
					"authorization": `Bearer ${JSON.parse(cookie?.value ?? '').token}`,
				}
			});

			return await response.json();
		}

	} catch(error: any) {
		return new Error(error);
	}
}
