export function errorHandler(code: number, message: string, detail?: object){
	return {
		code,
		message,
		detail
	}
}
