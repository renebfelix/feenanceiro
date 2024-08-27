import React from "react";
import { LayoutApp } from "./components/Layout/LayoutApp";
import { BillsContext, MainContextProvider } from "@feenanceiro/context";

export default async function LayoutAppRoot({ children }: Readonly<{children: React.ReactNode}>){
	return (
		<MainContextProvider>
			<LayoutApp>
				<BillsContext>
					{children}
				</BillsContext>
			</LayoutApp>
		</MainContextProvider>
	)
}
