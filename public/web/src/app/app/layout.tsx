import React from "react";
import { LayoutApp } from "./components/Layout/LayoutApp";

export default async function LayoutAppRoot({ children }: Readonly<{children: React.ReactNode}>){
	return (
		<LayoutApp>
			{children}
		</LayoutApp>
	)
}
