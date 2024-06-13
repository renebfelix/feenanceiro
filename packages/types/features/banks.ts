import { LoadingProps } from "../general/loading";

export type BanksProps = {
	id: string;
	name: string;
}

export type BanksFetchProps = {
	data: Array<BanksProps>;
	status: LoadingProps;
}
