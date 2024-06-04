import { stringDateFormat } from "../../../../utils/dateFormat";
import moment from "moment";
import { BodyBillProps } from "../types/types";

export function dataFieldsBillInfo(body: BodyBillProps, uuid: string){
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

export function selectFieldsBillInfo(){
	return {
		idBillingInfo: true,
		descriptionBillingInfo: true,
		valueBillingInfo: true,
		observationBillingInfo: true,
		parcelBillingInfo: true,
		divisionBillingInfo: true,
		typeBillingInfo: true,
		dataCriacaoBillingInfo: true,
		dataBillingInfo: true,
		valueTypeBillingInfo: true,
	}
}
