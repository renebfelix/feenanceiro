import { LoadingProps } from "../general/loading";

export type UserProps = {
	idUser: string;
	fullnameUser: string;
	emailUser: string;
	photoUser?: string;
	usernameUser: string;
}

export type UserFetchProps = {
	data: UserProps;
	status: LoadingProps;
}
