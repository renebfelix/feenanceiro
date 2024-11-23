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

interface FetchResponseProps {
	data?: any,
	error?: {
		code: number,
		message: string,
	}
}

export async function getFetch(params: FetchProps): Promise<FetchResponseProps>{
	const { method, url, data } = params;
	const cookie = Cookies.get('token_fee');
	let headersConfig = {};

	try {
		if (method === "POST" || method === "PUT"){
			headersConfig = {
				"Content-Type" : "application/json",
				"Access-Control-Allow-Origin": "https://feenanceiro-web.vercel.app"
			}
		}

		if (!cookie || !isValidJSON(cookie)) {
			throw new Error("Token inválido");
		} else {
			let { token } = JSON.parse(cookie);
			const decoded = jwtDecode(token);
			const currentDate = new Date();

			if (decoded.exp && decoded.exp * 1000 < currentDate.getTime()) {
				const newToken = await getNewTokenRefresh();

				if (!newToken.token){
					throw new Error("Erro ao gerar novo token");
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


			if (response.ok) {
				const dataResponse = await response.json();

				return {
					data: dataResponse ?? ""
				};
			} else {
				throw new Error("Ocorreu um erro");
			}

		}
	} catch(error: any) {
		return {
			error: {
				code: 100,
				message: error.message
			}
		}
	}
}
