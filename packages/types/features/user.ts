import { LoadingProps } from "../general/loading";

export type UserProps = {
	id: string;
	fullname: string;
	email: string;
	photo?: string;
	username: string;
	limit: number;
}

export type UserFetchProps = {
	data: UserProps;
	status: LoadingProps;
}
