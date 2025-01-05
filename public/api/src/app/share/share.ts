import { Request, Response, Router } from "express";
import { isEmpty } from "../../../utils/isEmpty";
import { errorHandler } from "../../../utils/errorsHandlers";
import { database } from "../../prisma/client";
import { regexDate } from "../../../utils/regex";
import { calculateMeta } from "../../app/bills/utils/calculate-meta";
import moment from "moment";
import { selectFieldsBillInfo } from "../../app/bills/utils/fields-bill-info";

const shareRoute = Router();

shareRoute.get('/share', async (req: Request, res: Response) => {
	const { period, responsable, user } = req.query;

	if (!period || !responsable || !user || isEmpty([period.toString(), responsable.toString(), user.toString()]) && regexDate(period.toString())) {
		res.status(401).send(errorHandler(1, "Parâmetros inválidos"));
	} else {
		const lastMonthDay = moment(period.toString(), "YYYY-MM").daysInMonth();
		const data = new Date(moment(period+'-'+lastMonthDay, "YYYY-MM-DD").format("YYYY-MM-DD"));

		const getUserInfos = await database.responsables.findFirst({
			where: {
				idResponsable: responsable.toString(),
				idUserResponsable: user.toString(),
			},
			select: {
				nameResponsable: true,
				users: {
					select: {
						fullnameUser: true,
					}
				}
			}
		});

		const getShareData = await database.billings_values.findMany({
			where: {
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
				],
				responsableBillingValue: responsable.toString(),
				deletedBillingValue: null,
				billings_info: {
					deletedBillingInfo: null,
					idUserBillingInfo: user.toString()
				}
			},
			select: {
				valueBillingValue: true,
				idBillingValue: true,
				responsableBillingValue: true,
				numberParcelBillingValue: true,
				dateBillingValue: true,
				billings_info: {
					select: {
						...selectFieldsBillInfo()
					}
				},
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
			}
		});

		let formatApi = getShareData.map((bill) => {
			return {
				id: bill.idBillingValue,
				value: bill.valueBillingValue,
				dateValue: bill.dateBillingValue,
				info: {
					id: bill.billings_info.idBillingInfo,
					title: bill.billings_info.descriptionBillingInfo,
					description: bill.billings_info.observationBillingInfo,
					division: bill.billings_info.divisionBillingInfo,
					value: bill.billings_info.valueBillingInfo,
					dateInfo: bill.billings_info.dataBillingInfo,
					dateCreationInfo: bill.billings_info.dataCriacaoBillingInfo,
					type: bill.billings_info.typeBillingInfo,
					method: bill.billings_info.valueTypeBillingInfo,
					statusPayment: bill.billings_status[0]?.statusBillingStatus ?? "EM_ABERTO"
				},
				parcel: {
					total: bill.billings_info.parcelBillingInfo,
					current: bill.numberParcelBillingValue,
				},
			}
		})

		if (!getShareData || !getUserInfos) {
			res.status(401).send(errorHandler(3, "Ocorreu um erro"));
		} else {
			res.send({
				meta: calculateMeta(getShareData),
				infos: {
					mainUser: getUserInfos.users.fullnameUser,
					responsable: getUserInfos.nameResponsable,
				},
				items: formatApi
			});
		}
	}
})

export { shareRoute }
