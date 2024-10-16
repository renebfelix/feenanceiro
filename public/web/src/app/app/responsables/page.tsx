"use client";

import { Box, Skeleton } from "@chakra-ui/react";
import { useMainContext } from "@feenanceiro/context"
import { EmptySpace } from "../components/EmptySpace/EmptySpace";
import { ResponsableCard } from "./components/Responsable/Responsable";
import { HeaderResponsable } from "./components/Header/HeaderResponsable";

export default function ResponsablesPage(){
	const { responsables } = useMainContext();

	return (
		<>
			<HeaderResponsable />

			<Box bg={"white"} p={3} rounded={"lg"}>
				{responsables.status.isLoading && (
					<Skeleton w={"full"} height={"250px"} />
				)}

				{!responsables.status.isLoading && responsables.status.hasError && (
					<EmptySpace variant="DANGER" decription="Ocorreu um erro." />
				)}

				{!responsables.status.isLoading && !responsables.status.hasError && (
					responsables.data.map((item) => {
						return <ResponsableCard key={item.id} {...item} />
					})
				)}
			</Box>
		</>
	)
}
