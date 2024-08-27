export function statusPayment(status: string){
	switch(status){
		case "EM_ABERTO":
			return "Em aberto";

		case "PAGO":
			return "Pago";

		default:
			return "";
	}
}


export function typePayment(status: string){
	switch(status){
		case "UNICA":
			return "Única";

		case "FIXA":
			return "Fixa";

		case "PARCELADA":
			return "Parcelada";

		default:
			return "";
	}
}

export function methodPayment(status: string){
	switch(status){
		case "SAIDA":
			return "Saída";

		case "ENTRADA":
			return "Entrada";

		default:
			return "";
	}
}
