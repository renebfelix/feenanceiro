"use client";

import { Box, Heading, Skeleton } from "@chakra-ui/react";
import { useMainContext } from "@feenanceiro/context"
import { EmptySpace } from "../components/EmptySpace/EmptySpace";
import { ResponsableCard } from "./components/Responsable/Responsable";

export default function ResponsablesPage(){
	const { responsables } = useMainContext();

	return (
		<>
			<Heading variant={"h1"} mb={4}>Responsáveis</Heading>

			<Box bg={"white"} p={3} rounded={"lg"}>
				{responsables.status.isLoading && (
					<Skeleton w={"full"} height={"250px"} />
				)}

				{!responsables.status.isLoading && responsables.status.hasError && (
					<EmptySpace variant="DANGER" decription="Ocorreu um erro." />
				)}

				{!responsables.status.isLoading && !responsables.status.hasError && (
					responsables.data.map((item) => {
						return <ResponsableCard {...item} />
					})
				)}
			</Box>
		</>
	)
}
