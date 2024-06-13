"use client";

import { Box, Flex, HStack, Heading, Tag, TagCloseButton, TagLabel, Text } from "@chakra-ui/react";
import { Filter } from "./components/Filter";

export default function BillsPage(){
	return (
		<>
			<Flex w={"full"} justifyContent={"space-between"}>
				<Heading variant={"h1"} as={"h1"}>Lançamentos</Heading>
				<Filter />
			</Flex>

			<HStack spacing={4} my={4}>
				<Text>Filtros aplicados:</Text>

				{['md'].map((size) => (
					<Tag
						size={size}
						key={size}
						variant='solid'
					>
						<TagLabel>Green</TagLabel>
						<TagCloseButton />
					</Tag>
				))}
			</HStack>

			<Box bgColor={"white"} p={5}>
				Page
			</Box>
		</>
	);
}
