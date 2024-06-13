"use server";

import { ResponseSuccessLoginProps } from "@feenanceiro/types";
import { cookies } from "next/headers";

export async function getNewTokenRefresh(){
	const cookie = cookies();
	let jsonCookie: ResponseSuccessLoginProps = JSON.parse(cookie?.get('token_fee')?.value ?? '');

	try {
		const response = await fetch(`${process.env.API_HOST}/auth/refresh_token`, {
			method: "POST",
			body: JSON.stringify({
				refresh_token: jsonCookie.refreshToken.idRefresh
			}),
			headers: {
				"Content-Type": "application/json"
			}
		});

		const responseTokens: ResponseSuccessLoginProps = await response.json();

		if(!responseTokens.refreshToken){
			//  Não atualizou o refresh
			jsonCookie = {
				...jsonCookie,
				token: responseTokens.token
			};
		} else{
			jsonCookie = responseTokens;
		}

		return jsonCookie;
	} catch(error: any) {
		return error
	}
}
