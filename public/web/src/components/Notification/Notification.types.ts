import { AlertStatus } from "@chakra-ui/react";

export interface NotificationProps {
	show: boolean;
	status: AlertStatus;
	message: string;
	errorCode?: number;
	isSimple?: boolean;
}
