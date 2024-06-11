"use server";

import { cookies } from 'next/headers';
import { ResponseSuccessLoginProps } from "@feenanceiro/types";

export async function getTokenCookie(){
	const token = cookies().get('token_fee');
	const jsonToken: ResponseSuccessLoginProps = JSON.parse(token?.value ?? '');

	return {
		token: jsonToken.token,
		refreshToken: jsonToken.refreshToken.idRefresh
	}
}
