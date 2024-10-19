"use client";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { useMainContext } from "@feenanceiro/context";
import { CardsForm } from "./Modal/CardsForm";
import { FaCreditCard } from "react-icons/fa";

export function HeaderCards(){
	const { setModalComponent, controlModal } = useMainContext();

	return (
		<Flex justifyContent={"space-between"}>
			<Heading variant={"h1"} mb={4}>
				<Flex gap={3} alignItems={"center"}>
					<FaCreditCard size={"30px"} />
					Cartões
				</Flex>
			</Heading>

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
