import { Request, Response, Router } from "express";
import { userDataToken } from "../../../utils/userDatatoken";
import { isEmpty } from "../../../utils/isEmpty";
import { errorHandler } from "../../../utils/errorsHandlers";
import { findResponsable } from "./utils/findResponsable";
import { getBillValues } from "../bills/utils/get-bill-values";
import { calculateMeta } from "../bills/utils/calculate-meta";
import { sendEmail } from "../../../utils/sendEmail";
import { moneyCurrency } from "../../../utils/moneyCurrency";

const sendEmailResponsableRoute = Router();

sendEmailResponsableRoute.post('/app/responsable/email/:uuidResponsable', async(req: Request, res: Response) => {
	const { uuidResponsable } = req.params;
	const { period, vencimento, fullname } = req.body;
	const { uuid } = userDataToken(req.headers.authorization ?? '');

	if (isEmpty([uuid, uuidResponsable, period, vencimento])){
		res.status(401).send(errorHandler(1, "Parâmetros inválidos"));
	} else {
		const responsable = await findResponsable(uuidResponsable, uuid);

		if (responsable && responsable.emailResponsable === null || !responsable){
			res.status(401).send(errorHandler(1, "Responsável sem e-mail cadastrado"));
		} else {
			const values = await getBillValues({
				responsable: uuidResponsable,
			}, uuid);
			const valoresFinais = calculateMeta(values);

			sendEmail(
				[{
					name: responsable.nameResponsable,
					email: responsable.emailResponsable ?? ''
				}],
				"Fatura mensal - Feenanceiro",
				'd-db4f79957196437c8b4cf7adccf1db25',
				{
					name: responsable.nameResponsable,
					fullname: fullname,
					dataVencimento: vencimento,
					valor: moneyCurrency(valoresFinais.totalGasto - valoresFinais.totalPago),
					link: `https://feenanceiro.com.br/share?user=${uuid}&responsable=${uuidResponsable}&period=${period}`
				},
				res
			)
		}
	}

});

export { sendEmailResponsableRoute }
