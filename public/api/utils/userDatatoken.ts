const jwt = require('jsonwebtoken');

export function userDataToken(token: string) {
	let { id } = jwt.verify(token, process.env.APP_JWT_PRIVATE);

	return {
		id: id,
	}
}
