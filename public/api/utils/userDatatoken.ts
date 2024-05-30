const jwt = require('jsonwebtoken');
import { escape } from 'querystring';

export function userDataToken(token: string) {
	let { id, username } = jwt.verify(token, process.env.APP_JWT_PRIVATE);

	return {
		id: escape(id),
		username: escape(username)
	}
}
