export async function handleCreateAccount(data: any, event: any){
	const urlCors = process.env.APP_URL_CORS;

	try {
		const response: any = await fetch(`${process.env.API_HOST}/auth/create-account`, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json"
			}
		})

		return response;
	} catch(error: any) {
		throw new Error(error);
	}
}
