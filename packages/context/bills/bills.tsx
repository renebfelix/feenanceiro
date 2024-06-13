"use client";

import { MetaTagsBillsProps, BillProps, LoadingProps } from "@feenanceiro/types";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useMemo, useState } from "react";
import { META_BILLS_INITITAL_STATE } from "./initial-state";
import { STATUS_INITIAL_STATE } from "../default/initial-state";

interface BillContext {
	meta: MetaTagsBillsProps;
	setMeta: Dispatch<SetStateAction<MetaTagsBillsProps>>;
	items: Array<BillProps>;
	setItems: Dispatch<SetStateAction<Array<BillProps>>>;
	status: LoadingProps,
	setStatus: Dispatch<SetStateAction<LoadingProps>>;
}

const Context = createContext<BillContext>({
	meta: META_BILLS_INITITAL_STATE,
	setMeta: () => {},
	items: [],
	setItems: () => [],
	status: STATUS_INITIAL_STATE,
	setStatus: () => {},
})

export function BillsContext({ children }: Readonly<{children: ReactNode}>){
	const [meta, setMeta] = useState<MetaTagsBillsProps>(META_BILLS_INITITAL_STATE);
	const [status, setStatus] = useState<LoadingProps>(STATUS_INITIAL_STATE);
	const [items, setItems] = useState<Array<BillProps>>([]);

	const useMemoBills = useMemo(() => ({
		meta, setMeta,
		items, setItems,
		status, setStatus,
	}), [meta, items, status]);

	return (
		<Context.Provider value={useMemoBills}>
			{children}
		</Context.Provider>
	)
}

export const useBillsContext = () => useContext(Context);
