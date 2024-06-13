import { LoadingProps } from "../general/loading";

export type ResponsableProps = {
	id: string;
	name: string,
	email?: string,
	isDefault: boolean;
	acceptedInvite?: boolean;
	isInvited: boolean;
}

export type ResponsableFetchProps = {
	data: Array<ResponsableProps>;
	status: LoadingProps;
}
