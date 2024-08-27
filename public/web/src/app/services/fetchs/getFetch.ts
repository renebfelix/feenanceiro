"use client";
import { isValidJSON } from '@feenanceiro/utils';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { getNewTokenRefresh } from '../tokens/generateNewToken';
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

		if (!cookie || !isValidJSON(cookie)) {
			return new Error();
		} else {
			let { token } = JSON.parse(cookie);
			const decoded = jwtDecode(token);
			const currentDate = new Date();

			if (decoded.exp && decoded.exp * 1000 < currentDate.getTime()) {
				const newToken = await getNewTokenRefresh();

				if (!newToken.token){
					return new Error();
				}

				Cookies.set('token_fee', JSON.stringify(newToken));
			}

			const response = await fetch(`${process.env.API_HOST}${url}`, {
				method: method,
				body: JSON.stringify(data) ?? undefined,
				cache: "no-cache",
				headers: {
					...headersConfig,
					"authorization": `Bearer ${JSON.parse(Cookies.get('token_fee') ?? '').token}`,
				}
			});

			return await response.json();
		}
	} catch(error: any) {
		return new Error(error);
	}
}
