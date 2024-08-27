"use client";

import { BanksFetchProps, CardsFetchProps, CategoriesFetchProps, ControlDisclosureProps, ResponsableFetchProps, UserFetchProps } from "@feenanceiro/types";
import { Dispatch, ReactNode, RefObject, SetStateAction, createContext, useContext, useMemo, useRef, useState } from "react";
import { BANKS_INITITAL_STATE, CARDS_INITITAL_STATE, CATEGORIES_INITIAL_STATE, MODAL_INITIAL_STATE, RESPONSABLE_INITIAL_STATE, USER_INITIAL_STATE } from "./initial-states";
import { useDisclosure } from "@chakra-ui/react";
import { ModalComponentProps } from "@feenanceiro/types/components/modal";

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
	controlModal: ControlDisclosureProps;
	modalComponent: ModalComponentProps;
	setModalComponent: Dispatch<SetStateAction<ModalComponentProps>>;
	refreshBillings?: RefObject<HTMLButtonElement>;
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
	controlModal: {
		isOpen: false,
		onClose: () => {},
		onOpen: () => {},
	},
	modalComponent: MODAL_INITIAL_STATE,
	setModalComponent: () => {},
	refreshBillings: undefined,
});

export function MainContextProvider({ children }: Readonly<{children: ReactNode}>){
	const [user, setUser] = useState<UserFetchProps>(USER_INITIAL_STATE);
	const [responsables, setResponsables] = useState<ResponsableFetchProps>(RESPONSABLE_INITIAL_STATE);
	const [categories, setCategories] = useState<CategoriesFetchProps>(CATEGORIES_INITIAL_STATE);
	const [cards, setCards] = useState<CardsFetchProps>(CARDS_INITITAL_STATE);
	const [banks, setBanks] = useState<BanksFetchProps>(BANKS_INITITAL_STATE);
	const [modalComponent, setModalComponent] = useState<ModalComponentProps>(MODAL_INITIAL_STATE);
	const controlModal = useDisclosure();
	const refreshBillings = useRef(null);

	const appMemo = useMemo(() => ({
		user, setUser,
		responsables, setResponsables,
		categories, setCategories,
		cards, setCards,
		banks, setBanks,
		modalComponent, setModalComponent,
		controlModal,
		refreshBillings
	}), [
		user, responsables, categories, cards, banks, modalComponent, controlModal, refreshBillings
	]);

	return (
		<MainContext.Provider value={appMemo}>
			{children}
		</MainContext.Provider>
	)
}

export const useMainContext = () => useContext(MainContext);
