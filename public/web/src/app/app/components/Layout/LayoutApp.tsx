"use client";

import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import { HeaderApp } from "../Header/Header";

export function LayoutApp({children}: Readonly<{children: ReactNode}>){
	return (
		<>
			<HeaderApp />
			<Box w={"full"} bgColor={"secundary.400"} paddingTop={"50px"}>
				{children}
			</Box>
		</>
	)
}
