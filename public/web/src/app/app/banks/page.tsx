'use client';
import { useMainContext } from "@feenanceiro/context";
import { HeaderBanks } from "./components/HeaderBanks/HeaderBanks";
import { Box, Flex, Skeleton, Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { EmptySpace } from "../components/EmptySpace/EmptySpace";
import { Banks } from "./components/Banks/Banks";

export default function BanksPage(){
	const { banks } = useMainContext();

	return (
		<>
			<HeaderBanks />

			<Flex flexDirection={"column"} gap={4} rounded={"lg"}>
				{banks.status.isLoading && (
					<Skeleton w={"full"} height={"250px"} />
				)}

				{!banks.status.isLoading && banks.status.hasError && (
					<EmptySpace variant="DANGER" decription="Ocorreu um erro." />
				)}

				{!banks.status.isLoading && !banks.status.hasError && (
					banks.data.length <= 0 ?
						<Box bg={"white"} borderRadius={5}>
							<EmptySpace
								variant="DEFAULT"
								decription="Nenhum banco adicionado"
							/>
						</Box>
					:

					<TableContainer borderRadius={5} border="2px solid" borderColor={"white"}>
						<Table bg={"white"} variant={"striped"}>
							<Thead>
								<Tr>
									<Th>Nome</Th>
									<Th></Th>
								</Tr>
							</Thead>

							<Tbody>
								{banks.data.map((item) => {
									return <Banks key={item.id} {...item} />
								})}
							</Tbody>
						</Table>
					</TableContainer>

				)}
			</Flex>
		</>
	)
}
