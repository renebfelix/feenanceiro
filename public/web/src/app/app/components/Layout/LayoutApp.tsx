"use client";

import { Box, Container } from "@chakra-ui/react";
import { ReactNode } from "react";
import { HeaderApp } from "../Header/Header";
import { Footer } from "../Footer/Footer";

export function LayoutApp({children}: Readonly<{children: ReactNode}>){
	return (
		<>
			<HeaderApp />

			<Box w={"full"} paddingTop={"65px"}>
				<Container my={4} maxW='container.xl' w={"100%"}>
					{children}
				</Container>
			</Box>

			<Footer />
		</>
	)
}
