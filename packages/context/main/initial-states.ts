import { LoadingProps, ResponsableProps, UserProps } from "@feenanceiro/types"

export const USER_INITIAL_STATE : UserProps = {
	emailUser: "",
	fullnameUser: "",
	idUser: "",
	usernameUser: "",
	photoUser: "",
}

export const START_INITIAL_STATE: LoadingProps = {
	hasError: false,
	isLoading: true,
}
