"use client";

import { Box, Flex, Skeleton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { HeaderCards } from "./components/HeaderCards";
import { useMainContext } from "@feenanceiro/context";
import { EmptySpace } from "../components/EmptySpace/EmptySpace";
import { Cards } from "./components/Cards/Cards";

export default function CardsPage(){
	const { cards } = useMainContext();

	return (
		<>
			<HeaderCards></HeaderCards>

			<Flex flexDirection={"column"} gap={4} rounded={"lg"}>
				{cards.status.isLoading && (
					<Skeleton w={"full"} height={"250px"} />
				)}

				{!cards.status.isLoading && cards.status.hasError && (
					<EmptySpace variant="DANGER" decription="Ocorreu um erro." />
				)}

				{!cards.status.isLoading && !cards.status.hasError && (
					cards.data.length <= 0 ?
						<Box bg={"white"} borderRadius={5}>
							<EmptySpace
								variant="DEFAULT"
								decription="Nenhum cartão adicionado"
							/>
						</Box>
					:

					<TableContainer borderRadius={5} border="2px solid" borderColor={"white"}>
						<Table bg={"white"} variant={"striped"}>
							<Thead>
								<Tr>
									<Th>Nome</Th>
									<Th isNumeric>Fechamento</Th>
									<Th isNumeric>Vencimento</Th>
									<Th isNumeric>Limite</Th>
									<Th></Th>
								</Tr>
							</Thead>

							<Tbody>
								{cards.data.map((item) => {
									return <Cards {...item} />
								})}
							</Tbody>
						</Table>
					</TableContainer>

				)}
			</Flex>
		</>
	)
}
