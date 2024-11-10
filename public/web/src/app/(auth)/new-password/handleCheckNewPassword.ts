"use client";

export async function handleCheckNewPassword(uuid: string | undefined, email: string | undefined){
	try{
		const responseFetch : Response = await fetch(`${process.env.API_HOST}/password/verify-reset?uuid=${uuid}&email=${email}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		});

		return responseFetch;
	} catch (error: any){
		throw new Error(error);
	}
}
