export function regexDate(texto: string): boolean {
	const regex = /^\d{4}-\d{2}$/;
	const resultado = regex.test(texto ?? '');
	return resultado;
}
