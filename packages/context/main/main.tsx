"use client";

import { BanksFetchProps, CardsFetchProps, CategoriesFetchProps, LoadingProps, ResponsableFetchProps, UserFetchProps } from "@feenanceiro/types";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useMemo, useState } from "react";
import { BANKS_INITITAL_STATE, CARDS_INITITAL_STATE, CATEGORIES_INITIAL_STATE, RESPONSABLE_INITIAL_STATE, START_INITIAL_STATE, USER_INITIAL_STATE } from "./initial-states";

interface MainContextProps {
	user: UserFetchProps;
	setUser: Dispatch<SetStateAction<UserFetchProps>>;
	responsables: ResponsableFetchProps;
	setResponsables: Dispatch<SetStateAction<ResponsableFetchProps>>;
	categories: CategoriesFetchProps;
	setCategories: Dispatch<SetStateAction<CategoriesFetchProps>>;
	cards: CardsFetchProps;
	setCards: Dispatch<SetStateAction<CardsFetchProps>>;
	banks: BanksFetchProps;
	setBanks: Dispatch<SetStateAction<BanksFetchProps>>;
}

const MainContext = createContext<MainContextProps>({
	user:USER_INITIAL_STATE,
	setUser: ()  => {},
	responsables: RESPONSABLE_INITIAL_STATE,
	setResponsables: () => {},
	categories: CATEGORIES_INITIAL_STATE,
	setCategories: () => {},
	cards: CARDS_INITITAL_STATE,
	setCards: () => {},
	banks: BANKS_INITITAL_STATE,
	setBanks: () => {},
});

export function MainContextProvider({ children }: Readonly<{children: ReactNode}>){
	const [user, setUser] = useState<UserFetchProps>(USER_INITIAL_STATE);
	const [responsables, setResponsables] = useState<ResponsableFetchProps>(RESPONSABLE_INITIAL_STATE);
	const [categories, setCategories] = useState<CategoriesFetchProps>(CATEGORIES_INITIAL_STATE);
	const [cards, setCards] = useState<CardsFetchProps>(CARDS_INITITAL_STATE);
	const [banks, setBanks] = useState<BanksFetchProps>(BANKS_INITITAL_STATE);

	const appMemo = useMemo(() => ({
		user, setUser,
		responsables, setResponsables,
		categories, setCategories,
		cards, setCards,
		banks, setBanks
	}), [
		user, responsables, categories, cards, banks
	]);

	return (
		<MainContext.Provider value={appMemo}>
			{children}
		</MainContext.Provider>
	)
}

export const useMainContext = () => useContext(MainContext);
