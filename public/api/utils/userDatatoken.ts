const jwt = require('jsonwebtoken');

export function userDataToken(token: string) {
	const newToken = token.split(" ");

	let { uuid, email } = jwt.verify(newToken[1], process.env.APP_JWT_PRIVATE);

	return {
		uuid,
		email
	}
}
