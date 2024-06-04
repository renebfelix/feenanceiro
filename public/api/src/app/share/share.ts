import { Request, Response, Router } from "express";
import { isEmpty } from "../../../utils/isEmpty";
import { errorHandler } from "../../../utils/errorsHandlers";
import { database } from "../../prisma/client";
import { regexDate } from "../../../utils/regex";
import { calculateMeta } from "../../app/bills/utils/calculate-meta";

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
			res.send({
				meta: calculateMeta(getShareData),
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
