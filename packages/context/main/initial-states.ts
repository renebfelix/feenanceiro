import { BanksFetchProps, CategoriesFetchProps, LoadingProps, UserFetchProps } from "@feenanceiro/types"
import { CardsFetchProps } from "@feenanceiro/types/features/cards"
import { ResponsableFetchProps } from "@feenanceiro/types/features/responsables"

export const START_INITIAL_STATE: LoadingProps = {
	hasError: false,
	isLoading: true,
}

export const USER_INITIAL_STATE : UserFetchProps = {
	data: {
		emailUser: "",
		fullnameUser: "",
		idUser: "",
		usernameUser: "",
		photoUser: "",
	},
	status: START_INITIAL_STATE
}

export const RESPONSABLE_INITIAL_STATE: ResponsableFetchProps = {
	data: [],
	status: START_INITIAL_STATE,
}

export const CATEGORIES_INITIAL_STATE: CategoriesFetchProps = {
	data: [],
	status: START_INITIAL_STATE,
}

export const CARDS_INITITAL_STATE: CardsFetchProps = {
	data: [],
	status: START_INITIAL_STATE,
}

export const BANKS_INITITAL_STATE: BanksFetchProps = {
	data: [],
	status: START_INITIAL_STATE,
}
