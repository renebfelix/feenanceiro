"use client";

export async function handleNewPassword(data: any, event?: any, uuid?: string, email?: string){
	try{
		const responseFetch : Response = await fetch(`${process.env.API_HOST}/password/change-password?uuid=${uuid}&email=${email}`, {
			method: "PUT",
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
