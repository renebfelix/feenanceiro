import { Request, Response, Router } from "express";
import { isEmpty } from "../../../utils/isEmpty";
import { errorHandler } from "../../../utils/errorsHandlers";
import { database } from "../../prisma/client";
import { regexDate } from "../../../utils/regex";

const shareRoute = Router();

shareRoute.get('/share', async (req: Request, res: Response) => {
	const { period, responsable, user } = req.query;

	if (!period || !responsable || !user || isEmpty([period.toString(), responsable.toString(), user.toString()]) && regexDate(period.toString())) {
		res.status(401).send(errorHandler(1, "Parâmetros inválidos"));
	} else {
		const dateSplit = period.toString().split("-");

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
				responsableBillingValue: responsable.toString(),
				deletedBillingValue: null,
				billings_info: {
					deletedBillingInfo: null,
					idUserBillingInfo: user.toString()
				}
			},
			select: {
				idBillingValue: true,
				valueBillingValue: true,
				dateBillingValue: true,
				numberParcelBillingValue: true,
				billings_info: {
					select: {
						descriptionBillingInfo: true,
						typeBillingInfo: true,
						valueTypeBillingInfo: true,
						parcelBillingInfo: true,
					}
				},
				billings_status: {
					select:{
						statusBillingStatus: true,
					}
				},
			}
		});

		if (!getShareData || !getUserInfos) {
			res.status(401).send(errorHandler(3, "Ocorreu um erro"));
		} else {
			let totalGasto = 0;
			let totalEntradas = 0;
			let totalPago = 0;

			getShareData.map((bill) => {
				if (bill.billings_info.valueTypeBillingInfo === "SAIDA"){
					totalGasto = totalGasto + bill.valueBillingValue

					if (bill?.billings_status[0]?.statusBillingStatus === "PAGO"){
						totalPago = totalPago + bill.valueBillingValue;
					}
				} else {
					totalEntradas = totalEntradas + bill.valueBillingValue
				}
			});

			res.send({
				meta: {
					totalGasto,
					totalPago,
					totalEntradas,
					balance: totalEntradas - totalGasto
				},
				infos: {
					mainUser: getUserInfos.users.fullnameUser,
					responsable: getUserInfos.nameResponsable,
				},
				items: getShareData
			});
		}
	}
})

export { shareRoute }
