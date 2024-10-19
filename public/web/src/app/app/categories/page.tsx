'use client';
import { Flex, Skeleton, Box, TableContainer, Table, Thead, Tr, Th, Tbody } from "@chakra-ui/react";
import { Cards } from "../cards/components/Cards/Cards";
import { EmptySpace } from "../components/EmptySpace/EmptySpace";
import { HeaderCategory } from "./components/HeaderCategory/HeaderCategory";
import { useMainContext } from "@feenanceiro/context";
import { Category } from "./components/Categories/Category";

export default function CategoriesPage(){
	const { categories } = useMainContext();

	return (
		<>
			<HeaderCategory />

			<Flex flexDirection={"column"} gap={4} rounded={"lg"}>
				{categories.status.isLoading && (
					<Skeleton w={"full"} height={"250px"} />
				)}

				{!categories.status.isLoading && categories.status.hasError && (
					<EmptySpace variant="DANGER" decription="Ocorreu um erro." />
				)}

				{!categories.status.isLoading && !categories.status.hasError && (
					categories.data.length <= 0 ?
						<Box bg={"white"} borderRadius={5}>
							<EmptySpace
								variant="DEFAULT"
								decription="Nenhuma categoria adicionada"
							/>
						</Box>
					:

					<TableContainer borderRadius={5} border="2px solid" borderColor={"white"}>
						<Table bg={"white"} variant={"striped"}>
							<Thead>
								<Tr>
									<Th>Nome</Th>
									<Th isNumeric>Limite</Th>
									<Th></Th>
								</Tr>
							</Thead>

							<Tbody>
								{categories.data.map((item) => {
									return <Category key={item.id} {...item} />
								})}
							</Tbody>
						</Table>
					</TableContainer>

				)}
			</Flex>
		</>
	)
}
