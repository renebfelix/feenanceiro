import { fetchCards } from "@/app/services/fetchs";
import { getFetchGeneral } from "@/app/services/fetchs/getFetchGeneral";
import { Box, Button, ModalBody, ModalFooter, Text, useToast } from "@chakra-ui/react";
import { useMainContext } from "@feenanceiro/context";
import { CardsProps } from "@feenanceiro/types";
import { useRef } from "react";
import { useForm } from "react-hook-form";

export function DeleteCard(params: Readonly<CardsProps>){
	const { handleSubmit } = useForm();
	const toast = useToast();
  	const toastIdRef = useRef<any>();
	const { setCards, controlModal } = useMainContext();

	return (
		<Box
			as="form"
			onSubmit={handleSubmit(async (data, event) => {
				toastIdRef.current = toast({ description: 'Excluindo', position: "top-right", isClosable: true, duration: 3000 });

				const response = await getFetchGeneral({
					method: "DELETE",
					url: `/app/card/${params.id}`,
				});

				if (response.status === 200){
					toast.update(toastIdRef.current, { description: "Excluído com sucesso", status: "success" });

					const cards = await fetchCards();

					if (!cards.status.hasError){
						setCards(cards);
					}

					controlModal.onClose();
				} else {
					toast.update(toastIdRef.current, { description: "Ocorreu um erro", status: "error" });
				}
			})}
		>
			<ModalBody>
				<Text mb={3}>Você tem certeza que deseja excluir o cartão <strong>{params.name}</strong>? Esta ação não poderá ser desfeita.</Text>
			</ModalBody>

			<ModalFooter gap={4}>
				<Button type="button">Cancelar</Button>
				<Button type="submit" variant={"danger"}>Excluir</Button>
			</ModalFooter>
		</Box>
	)
}
