"use client";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { useMainContext } from "@feenanceiro/context";
import { ResponsableForm } from "../Modal/ResponsableForm";

export function HeaderResponsable(){
	const { setModalComponent, controlModal } = useMainContext();

	return (
		<Flex justifyContent={"space-between"}>
			<Heading variant={"h1"} mb={4}>Responsáveis</Heading>

			<Button
				variant={'primary'}
				onClick={() => {
					setModalComponent({
						title: "Adicionar responsável",
						bodyComponent: <ResponsableForm />
					});

					controlModal.onOpen();
				}}
			>Adicionar</Button>
		</Flex>
	)
}
