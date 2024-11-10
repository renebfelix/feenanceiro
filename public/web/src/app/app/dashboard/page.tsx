"use client";

import { Box, Flex } from "@chakra-ui/react";
import { EmptySpace } from "../components/EmptySpace/EmptySpace";

export default function DashboardPage(){
	return (
		<Flex borderRadius={8} height={"50vh"} justifyContent={"center"} alignItems={"center"} bg={"white"}>
			<Box maxW={"350px"} textAlign={"center"}>
				<EmptySpace variant="DEFAULT" decription="Opa, ainda estamos desenvolvendo uma dashboard para você. Aguarde."></EmptySpace>
			</Box>
		</Flex>
	);
}
