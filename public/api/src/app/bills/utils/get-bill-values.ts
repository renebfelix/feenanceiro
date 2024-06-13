import { database } from "../../../prisma/client";
import { FilterProps } from "../types/types";
import { selectFieldsBillInfo } from "./fields-bill-info";

export async function getBillValues(filters: FilterProps, uuidUser: string){
	const { period, responsable, payment, category, type, paymentValue } = filters;
	const dateSplit = period?.toString().split("-");

	return await database.billings_values.findMany({
		where: {
			responsableBillingValue: responsable?.toString(),
			deletedBillingValue: null,
			billings_info:{
				idUserBillingInfo: uuidUser,
				deletedBillingInfo: null,
				typeBillingInfo: type?.toString(),
				categoryBillingInfo: category?.toString(),
				valueTypeBillingInfo: paymentValue?.toString(),
				paymentBillingInfo: payment?.toString(),
			},
			OR: [
				{
					dateBillingValue: {
						gte: dateSplit && new Date(dateSplit[1]+'-'+dateSplit[0]+'-01'),
						lte: dateSplit && new Date(dateSplit[1]+'-'+dateSplit[0]+'-31'),
					},
				},
				{
					dateBillingValue: null
				}
			],
		},
		select: {
			valueBillingValue: true,
			idBillingValue: true,
			responsableBillingValue: true,
			numberParcelBillingValue: true,
			dateBillingValue: true,
			billings_status: {
				where: {
					dateBillingStatus: {
						gte: dateSplit && new Date(dateSplit[1]+'-'+dateSplit[0]+'-01'),
						lte: dateSplit && new Date(dateSplit[1]+'-'+dateSplit[0]+'-31'),
					}
				},
				select:{
					idBillingStatus: true,
					idBillingValueBillingStatus: true,
					statusBillingStatus: true,
					dateBillingStatus: true,
				},
			},
			billings_info: {
				select:{
					...selectFieldsBillInfo(),
					cards: {
						select: {
							nameCard: true,
							idCard: true,
						}
					},
					categories: {
						select: {
							nameCategory: true,
							idCategory: true,
						}
					}
				}
			},
			responsables: {
				select: {
					nameResponsable: true,
					idResponsable: true,
				}
			}
		}
	});
}
