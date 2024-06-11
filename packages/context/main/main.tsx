"use client";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useMemo, useState } from "react";

type UserContextProps = {
	idUser: string;
	fullnameUser: string;
	emailUser: string;
	photoUser?: string;
	usernameUser: string;
}

type LoadingContexProps = {
	isLoading: boolean;
	hasError: boolean;
}

interface MainContextProps {
	user: UserContextProps;
	setUser: Dispatch<SetStateAction<UserContextProps>>;
	start: LoadingContexProps;
	setStart: Dispatch<SetStateAction<LoadingContexProps>>;
}

const USER_INITIAL_STATE : UserContextProps = {
	emailUser: "",
	fullnameUser: "",
	idUser: "",
	usernameUser: "",
	photoUser: "",
}

const START_INITIAL_STATE: LoadingContexProps = {
	hasError: false,
	isLoading: true,
}

const MainContext = createContext<MainContextProps>({
	user: USER_INITIAL_STATE,
	setUser: () => {},
	start: START_INITIAL_STATE,
	setStart: () => {}
});

export function MainContextProvider({ children }: Readonly<{children: ReactNode}>){
	const [user, setUser] = useState<UserContextProps>(USER_INITIAL_STATE);
	const [start, setStart] = useState<LoadingContexProps>(START_INITIAL_STATE);

	const appMemo = useMemo(() => ({
		user, setUser,
		start, setStart,
	}), [user, start]);

	return (
		<MainContext.Provider value={appMemo}>
			{children}
		</MainContext.Provider>
	)
}

export const useMainContext = () => useContext(MainContext);
