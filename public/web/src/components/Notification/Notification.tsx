import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";
import type { AlertStatus } from "@chakra-ui/react";

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

export function Notification({status, message, error}: Readonly<{status: AlertStatus; message: string; error?: number}>){
	return (
		<Alert status={status}>
			<AlertIcon></AlertIcon>
			<AlertTitle>{statusControl(status, error)}</AlertTitle>

			{message}
		</Alert>
	)
}
