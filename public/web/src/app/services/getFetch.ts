import { isValidJSON } from "@feenanceiro/utils";
import Cookies from "js-cookie";

interface FetchProps {
	url: string;
	method: "GET" | "POST" | "DELETE"| "PUT" | "PATCH";
	data?: Object
}

export async function getFetch(params: FetchProps){
	const { method, url, data } = params;
	const cookie = Cookies.get('token_fee');
	let headersConfig = {};

	try {
		if (method === "POST" || method === "PUT"){
			headersConfig = {
				"Content-Type" : "application/json",
			}
		}

		if (!isValidJSON(cookie)){
			return new Error();
		} else {
			const response = await fetch(`${process.env.API_HOST}${url}`, {
				method: method,
				body: JSON.stringify(data) ?? undefined,
				headers: {
					...headersConfig,
					"authorization": `Bearer ${JSON.parse(cookie ?? '').token}`,
				}
			});

			return await response.json();
		}

	} catch(error: any) {
		return new Error(error);
	}
}
