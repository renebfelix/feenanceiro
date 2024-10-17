"use client";
import { fetcResponsable } from "@/app/services/fetchs";
import { getFetchGeneral } from "@/app/services/fetchs/getFetchGeneral";
import { Box, Button, ModalBody, ModalFooter, Text, useToast } from "@chakra-ui/react";
import { useMainContext } from "@feenanceiro/context";
import { ResponsableProps } from "@feenanceiro/types";
import { useRef } from "react";
import { useForm } from "react-hook-form";

export function DeleteResponsable(params: Readonly<ResponsableProps>){
	const toast = useToast();
  	const toastIdRef = useRef<any>();
	const { controlModal, setResponsables } = useMainContext();

	const { handleSubmit } = useForm();

	return (
		<Box
			as="form"
			onSubmit={handleSubmit(async (data, event) => {
				toastIdRef.current = toast({ description: 'Excluindo', position: "top-right", isClosable: true, duration: 3000 });

				const response = await getFetchGeneral({
					method: "DELETE",
					url: `/app/responsable/${params.id}`,
				});

				if (response.status === 200){
					toast.update(toastIdRef.current, { description: "Excluído com sucesso", status: "success" });

					const responsables = await fetcResponsable();

					if (!responsables.status.hasError){
						setResponsables(responsables);
					}

					controlModal.onClose();
				} else {
					toast.update(toastIdRef.current, { description: "Ocorreu um erro", status: "error" });
				}
			})}
		>
			<ModalBody>
				<Text mb={3}>Você tem certeza que deseja excluir o(a) responsável <strong>{params.name}</strong>? Esta ação não poderá ser desfeita.</Text>

				<Box bgColor={"danger.100"} p={2}>
					<Text fontWeight={"bold"} color={"danger.400"}>Atenção!</Text>
					<Text fontSize={"14px"}>Todos os lançamentos deste responsável ainda aparecerão na plataforma.</Text>
				</Box>
			</ModalBody>

			<ModalFooter gap={5}>
				<Button type="button">Cancelar</Button>
				<Button type="submit" variant={"danger"}>Excluir</Button>
			</ModalFooter>
		</Box>
	)
}
