import { Response, Errback } from "express";

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

type EmailsToProps = {
	name: string;
	email: string;
};

type DynamicTemplateDate = {
	name: string;
	link: string;
}

export function sendEmail(
	ArrayTo: Array<EmailsToProps>,
	subject: string,
	template_id: string,
	dynamic_template_data: DynamicTemplateDate,
	res: Response
){
	const msg = {
		personalizations: [{ to: ArrayTo }],
		from: {
			email: process.env.APP_EMAIL_SENDGRID,
			name: 'Feenanceiro'
		},
		replay_to: {
			email: process.env.APP_EMAIL_SENDGRID,
			name: 'Feenanceiro'
		},
		subject: subject,
		template_id: template_id,
		"dynamic_template_data": dynamic_template_data
	};

	sgMail
	.send(msg)
	.then((response: any) => {
		res.status(response[0].statusCode).send();
	}, (error: Errback) => {
		res.status(400).send(error);
	});
}
