"use client";

export async function handleForgot(data: any, event?: any){
	try{
		const responseFetch : Response = await fetch(`${process.env.API_HOST}/password/reset-password`, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json"
			}
		});

		return responseFetch;
	} catch (error: any){
		throw new Error(error);
	}
}
