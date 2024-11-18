"use client";
import Cookies from 'js-cookie';

export async function handleLogin(data: any, event?: any){
	const urlCors = process.env.APP_URL_CORS;

	try{
		const responseFetch : Response = await fetch(`${process.env.API_HOST}/auth/login`, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			}
		});

		const dataResponse = await responseFetch.json();
		Cookies.set('token_fee', JSON.stringify(dataResponse));

		return dataResponse;
	} catch (error: any){
		throw new Error(error);
	}
}
