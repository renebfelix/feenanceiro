import { Button, Flex, Heading } from "@chakra-ui/react";
import { useMainContext } from "@feenanceiro/context";
import { BanksForm } from "../Modal/BanksForm";

export function HeaderBanks(){
	const { setModalComponent, controlModal } = useMainContext();

	return (
		<Flex justifyContent={"space-between"}>
			<Heading variant={"h1"} mb={4}>Bancos</Heading>

			<Button
				variant={'primary'}
				onClick={() => {
					setModalComponent({
						title: "Adicionar banco",
						bodyComponent: <BanksForm />
					});

					controlModal.onOpen();
				}}
			>Adicionar</Button>
		</Flex>
	)
}
