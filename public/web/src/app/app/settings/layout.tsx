"use client";

import { Box, Flex, Heading } from "@chakra-ui/react";
import { ReactNode } from "react";
import { EmptySpace } from "../components/EmptySpace/EmptySpace";

export default function SettingsLayout({children}: {children: ReactNode}){
	return (
		<>
			<Heading mb={5} variant={"h1"} as={"h1"}>Configurações</Heading>

			<Flex gap={3}>
				<Box minW={300} bgColor={"white"} borderRadius={8} p={4}>
					<EmptySpace decription="Em Breve" variant="DEFAULT" />
				</Box>

				<Box w={"full"} bgColor={"white"} borderRadius={8} p={4}>{children}</Box>
			</Flex>
		</>
	)
}
