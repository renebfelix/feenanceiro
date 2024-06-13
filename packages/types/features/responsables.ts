import { LoadingProps } from "../general/loading";

export type ResponsableProps = {
	idResponsable: string;
	nameResponsable: string,
	emailResponsable?: string,
	isDefaultResponsable: boolean;
	acceptedInviteResponsable?: boolean;
	isInvitedResponsable: boolean;
}

export type ResponsableFetchProps = {
	data: Array<ResponsableProps>;
	status: LoadingProps;
}
