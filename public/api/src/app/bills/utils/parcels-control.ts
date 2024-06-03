import moment from "moment";
import { BodyBillProps } from "../types/types";
import { stringDateFormat } from "../../../../utils/dateFormat";

function arrayDbFields(value: number, idInfo: string, responsable: string, date: Date | null, parcel: number){
	return {
		valueBillingValue: value,
		idBillingInfoBillingValue: idInfo,
		responsableBillingValue: responsable,
		dateBillingValue: date,
		numberParcelBillingValue: parcel,
	}
}

export function parcelsFieldsValueBill(body: BodyBillProps, uuidBillingInfo: string){
	const { value, date, type, parcels, division } = body;

	let ArrayValues : any = [];
	let valorParcela = 0;

	if (type === "PARCELADA") {
		valorParcela = (value/parcels)/division.length;

		for(let i = 1; i <= parcels; i++){
			let dateParcela = i === 1 ? date : moment(new Date(date)).add(i-1, "M").format("YYYY-MM-DD");

			// Looping para divisão
			for(const responsable of division){
				ArrayValues.push(
					arrayDbFields(
						valorParcela,
						uuidBillingInfo,
						responsable.value,
						new Date(dateParcela),
						i
					)
				)
			}
		}
	} else {
		valorParcela = value/division.length;

		for(const responsable of division){
			ArrayValues.push(
				arrayDbFields(
					valorParcela,
					uuidBillingInfo,
					responsable.value,
					type === "UNICA" ? stringDateFormat(date) : null,
					1
				)
			);
		}
	}

	return ArrayValues;
}
