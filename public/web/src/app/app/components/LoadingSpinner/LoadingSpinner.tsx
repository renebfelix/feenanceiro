"use client";
import { Box, Flex, Spinner, Text } from "@chakra-ui/react";

export function LoadingSpinner({ text } : {text: string;}){
	return <Flex height={150} p={5} alignItems={"center"} justifyContent={"center"}>
		<Flex gap={4} justifyContent={"center"} flexDirection={"column"}>
			<Spinner mx={"auto"} />
			<Text>{text}</Text>
		</Flex>
	</Flex>
}
