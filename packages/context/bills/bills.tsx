"use client";

import { MetaTagsBillsProps, BillProps } from "@feenanceiro/types";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useMemo, useState } from "react";

type StatusProps = {
	isLoading: boolean;
	hasError: boolean;
};

interface BillContext {
	meta: MetaTagsBillsProps;
	setMeta: Dispatch<SetStateAction<MetaTagsBillsProps>>;
	items: Array<BillProps>;
	setItems: Dispatch<SetStateAction<Array<BillProps>>>;
	status: StatusProps,
	setStatus: Dispatch<SetStateAction<StatusProps>>;
}

const Context = createContext<BillContext>({
	meta: {
		totalEntradas: 0,
		totalGasto: 0,
		totalPago: 0
	},
	setMeta: () => {},
	items: [],
	setItems: () => [],
	status: {
		hasError: false,
		isLoading: true
	},
	setStatus: () => {},
})

export function BillsContext({ children }: Readonly<{children: ReactNode}>){
	const [meta, setMeta] = useState<MetaTagsBillsProps>({
		totalEntradas: 0,
		totalGasto: 0,
		totalPago: 0
	});
	const [items, setItems] = useState<Array<BillProps>>([]);
	const [status, setStatus] = useState<StatusProps>({
		hasError: false,
		isLoading: true,
	})

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
