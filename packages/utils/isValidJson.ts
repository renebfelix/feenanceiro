export function isValidJSON(string: string | any) {
	try {
		JSON.parse(string);
	} catch (e) {
		return false;
	}

	return true;
}
