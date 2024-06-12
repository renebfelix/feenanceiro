import React from "react";
import { LayoutApp } from "./components/Layout/LayoutApp";
import { MainContextProvider } from "@feenanceiro/context";

export default async function LayoutAppRoot({ children }: Readonly<{children: React.ReactNode}>){
	return (
		<MainContextProvider>
			<LayoutApp>
				{children}
			</LayoutApp>
		</MainContextProvider>
	)
}
