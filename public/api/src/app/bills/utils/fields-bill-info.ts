import { stringDateFormat } from "../../../../utils/dateFormat";
import moment from "moment";
import { BodyBillProps } from "../types/types";

export function fieldsBillInfo(body: BodyBillProps, uuid: string){
	const { valueType, description, value, date, type, parcels, payment, category, division, observation } = body;

	return {
		valueTypeBillingInfo: valueType,
		descriptionBillingInfo: description,
		valueBillingInfo: value,
		dataBillingInfo: stringDateFormat(date),
		typeBillingInfo: type,
		parcelBillingInfo: parcels,
		paymentBillingInfo: payment,
		categoryBillingInfo: category,
		divisionBillingInfo: division.length,
		idUserBillingInfo: uuid,
		dataCriacaoBillingInfo: new Date(moment().format("YYYY-MM-DD H:mm:ss")),
		observationBillingInfo: observation,
	}
}
