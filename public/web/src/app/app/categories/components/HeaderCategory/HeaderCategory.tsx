import { Button, Flex, Heading } from "@chakra-ui/react";
import { useMainContext } from "@feenanceiro/context";
import { CategoryForm } from "../modal/CategoryForm";

export function HeaderCategory(){
	const { setModalComponent, controlModal } = useMainContext();

	return (
		<Flex justifyContent={"space-between"}>
			<Heading variant={"h1"} mb={4}>
				<Flex gap={3} alignItems={"center"}>
					Categorias
				</Flex>
			</Heading>

			<Button
				variant={'primary'}
				onClick={() => {
					setModalComponent({
						title: "Adicionar categoria",
						bodyComponent: <CategoryForm />
					});

					controlModal.onOpen();
				}}
			>Adicionar</Button>
		</Flex>
	)
}
