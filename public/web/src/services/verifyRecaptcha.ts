"use server";

export async function verifyRecaptcha(responseToken: string){
	try {
		const secreteKey = process.env.RECAPTCHA_SECRET_KEY;
		const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secreteKey}&response=${responseToken}`, {
			method: "GET",
		});

		if (response.status === 200){
			const data = await response.json();

			if (data.success) {
				return data;
			} else {
				throw new Error();
			}
		}

		throw new Error();
	} catch (err) {
		return err;
	}
}
