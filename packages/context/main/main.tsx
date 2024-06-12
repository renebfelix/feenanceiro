"use client";

import { BanksProps, CardsProps, CategoriesPorps, LoadingProps, ResponsableProps, UserProps } from "@feenanceiro/types";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useMemo, useState } from "react";
import { START_INITIAL_STATE, USER_INITIAL_STATE } from "./initial-states";

interface MainContextProps {
	user: UserProps;
	setUser: Dispatch<SetStateAction<UserProps>>;
	start: LoadingProps;
	setStart: Dispatch<SetStateAction<LoadingProps>>;
	responsables: Array<ResponsableProps>;
	setResponsables: Dispatch<SetStateAction<Array<ResponsableProps>>>;
	categories: Array<CategoriesPorps>;
	setCategories: Dispatch<SetStateAction<Array<CategoriesPorps>>>;
	cards: Array<CardsProps>;
	setCards: Dispatch<SetStateAction<Array<CardsProps>>>;
	banks: Array<BanksProps>;
	setBanks: Dispatch<SetStateAction<Array<BanksProps>>>;
}

const MainContext = createContext<MainContextProps>({
	user: USER_INITIAL_STATE,
	setUser: () => {},
	start: START_INITIAL_STATE,
	setStart: () => {},
	responsables: [],
	setResponsables: () => [],
	categories: [],
	setCategories: () => [],
	cards: [],
	setCards: () => [],
	banks: [],
	setBanks: () => [],
});

export function MainContextProvider({ children }: Readonly<{children: ReactNode}>){
	const [user, setUser] = useState<UserProps>(USER_INITIAL_STATE);
	const [start, setStart] = useState<LoadingProps>(START_INITIAL_STATE);
	const [responsables, setResponsables] = useState<Array<ResponsableProps>>([]);
	const [categories, setCategories] = useState<Array<CategoriesPorps>>([]);
	const [cards, setCards] = useState<Array<CardsProps>>([]);
	const [banks, setBanks] = useState<Array<BanksProps>>([]);

	const appMemo = useMemo(() => ({
		user, setUser,
		start, setStart,
		responsables, setResponsables,
		categories, setCategories,
		cards, setCards,
		banks, setBanks
	}), [
		user, start, responsables, categories, cards, banks
	]);

	return (
		<MainContext.Provider value={appMemo}>
			{children}
		</MainContext.Provider>
	)
}

export const useMainContext = () => useContext(MainContext);
