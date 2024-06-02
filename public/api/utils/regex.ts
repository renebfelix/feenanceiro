export function regexDate(texto: string): boolean {
	const regex = /^\d{2}-\d{4}$/;
	const resultado = regex.test(texto ?? '');
	return resultado;
}
