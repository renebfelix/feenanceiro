import moment from "moment";
import { database } from "../../../prisma/client";
import { FilterProps } from "../types/types";
import { selectFieldsBillInfo } from "./fields-bill-info";

export async function getBillValues(filters: FilterProps, uuidUser: string){
	const { period, responsable, payment, category, type, paymentValue } = filters;

	const lastMonthDay = moment(period, "YYYY-MM").daysInMonth();
	const data = new Date(moment(period+'-'+lastMonthDay, "YYYY-MM-DD").format("YYYY-MM-DD"));

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
			AND: [
				{
					OR: [
						{
							dateBillingValue: {
								gte: new Date(period+'-01'),
								lte: new Date(period+'-'+lastMonthDay),
							},
						},
						{
							dateBillingValue: null,
						},
					]
				},
				{
					OR: [
						{
							stopBillingValue: {
								gte: data,
							},
							billings_info: {
								dataBillingInfo: {
									lte: data,
								}
							}
						},
						{
							stopBillingValue: null,
							billings_info: {
								dataBillingInfo: {
									lte: data,
								}
							}
						}
					]
				}
			]
		},
		orderBy: [
			{
				billings_info: {
					typeBillingInfo: "asc",
				}
			},
			{
				billings_info: {
					dataBillingInfo: "asc",
				}
			}
		],
		select: {
			valueBillingValue: true,
			idBillingValue: true,
			responsableBillingValue: true,
			numberParcelBillingValue: true,
			dateBillingValue: true,
			billings_status: {
				where: {
					dateBillingStatus: {
						gte: new Date(period+'-01'),
						lte: new Date(period+'-'+lastMonthDay),
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
