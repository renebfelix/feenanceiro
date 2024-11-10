import { Alert, AlertIcon, AlertStatus, AlertTitle } from "@chakra-ui/react";
import { NotificationProps } from "./Notification.types";

function statusControl(status: AlertStatus, error?: number){
	switch (status) {
		case "error":
			return `Erro ${error}: `;

		case "success":
			return `Sucesso: `;

		case "warning":
			return `Atenção: `;
	}
}

export function Notification({status, message, errorCode, isSimple}: Readonly<NotificationProps>){
	return (
		<Alert status={status}>
			<AlertIcon></AlertIcon>
			{!isSimple && (
				<AlertTitle>{statusControl(status, errorCode)}</AlertTitle>
			)}

			{message}
		</Alert>
	)
}
