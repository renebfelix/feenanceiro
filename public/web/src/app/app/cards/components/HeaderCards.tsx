"use client";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { useMainContext } from "@feenanceiro/context";
import { CardsForm } from "./Modal/CardsForm";

export function HeaderCards(){
	const { setModalComponent, controlModal } = useMainContext();

	return (
		<Flex justifyContent={"space-between"}>
			<Heading variant={"h1"} mb={4}>Cartões</Heading>

			<Button
				variant={'primary'}
				onClick={() => {
					setModalComponent({
						title: "Adicionar cartão",
						bodyComponent: <CardsForm />
					});

					controlModal.onOpen();
				}}
			>Adicionar</Button>
		</Flex>
	)
}
