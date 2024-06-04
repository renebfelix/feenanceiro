export function calculateMeta(listBills: Array<any>){
	let totalGasto = 0;
	let totalEntradas = 0;
	let totalPago = 0;

	listBills.map((bill) => {
		if (bill.billings_info.valueTypeBillingInfo === "SAIDA"){
			totalGasto = totalGasto + bill.valueBillingValue

			if (bill?.billings_status[0]?.statusBillingStatus === "PAGO"){
				totalPago = totalPago + bill.valueBillingValue;
			}
		} else {
			totalEntradas = totalEntradas + bill.valueBillingValue
		}
	});

	return {
		totalGasto,
		totalEntradas,
		totalPago
	}
}
