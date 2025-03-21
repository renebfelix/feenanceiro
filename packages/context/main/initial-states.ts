import { BanksFetchProps, CategoriesFetchProps, UserFetchProps } from "@feenanceiro/types"
import { CardsFetchProps } from "@feenanceiro/types/features/cards"
import { ResponsableFetchProps } from "@feenanceiro/types/features/responsables"
import { STATUS_INITIAL_STATE } from "../default/initial-state"
import { ModalComponentProps } from "@feenanceiro/types/components/modal"

export const USER_INITIAL_STATE : UserFetchProps = {
	data: {
		email: "",
		fullname: "",
		id: "",
		username: "",
		photo: "",
		limit: 0
	},
	status: STATUS_INITIAL_STATE
}

export const RESPONSABLE_INITIAL_STATE: ResponsableFetchProps = {
	data: [],
	status: STATUS_INITIAL_STATE,
}

export const CATEGORIES_INITIAL_STATE: CategoriesFetchProps = {
	data: [],
	status: STATUS_INITIAL_STATE,
}

export const CARDS_INITITAL_STATE: CardsFetchProps = {
	data: [],
	status: STATUS_INITIAL_STATE,
}

export const BANKS_INITITAL_STATE: BanksFetchProps = {
	data: [],
	status: STATUS_INITIAL_STATE,
}

export const MODAL_INITIAL_STATE: ModalComponentProps = {
	title: "",
	bodyComponent: "",
}
