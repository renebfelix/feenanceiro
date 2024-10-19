"use client";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { useMainContext } from "@feenanceiro/context";
import { ResponsableForm } from "../Modal/ResponsableForm";
import { FaUser } from "react-icons/fa";

export function HeaderResponsable(){
	const { setModalComponent, controlModal } = useMainContext();

	return (
		<Flex justifyContent={"space-between"}>
			<Heading variant={"h1"} mb={4}>
				<Flex gap={3} alignItems={"center"}>
					<FaUser size={"30px"} />
					Responsáveis
				</Flex>
			</Heading>

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
