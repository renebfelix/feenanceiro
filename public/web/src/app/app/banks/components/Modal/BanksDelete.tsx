import { fetchBanks } from "@/app/services/fetchs";
import { getFetchGeneral } from "@/app/services/fetchs/getFetchGeneral";
import { Box, Button, ModalBody, ModalFooter, Text, useToast } from "@chakra-ui/react";
import { useMainContext } from "@feenanceiro/context";
import { BanksProps } from "@feenanceiro/types";
import { useRef } from "react";
import { useForm } from "react-hook-form";

export function DeleteBank(params: Readonly<BanksProps>){
	const { handleSubmit } = useForm();
	const toast = useToast();
  	const toastIdRef = useRef<any>();
	const { setBanks, controlModal } = useMainContext();

	return (
		<Box
			as="form"
			onSubmit={handleSubmit(async (data, event) => {
				toastIdRef.current = toast({ description: 'Excluindo', position: "top-right", isClosable: true, duration: 3000 });

				const response = await getFetchGeneral({
					method: "DELETE",
					url: `/app/bank/${params.id}`,
				});

				if (response.status === 200){
					toast.update(toastIdRef.current, { description: "Excluído com sucesso", status: "success" });

					const banks = await fetchBanks();

					if (!banks.status.hasError){
						setBanks(banks);
					}

					controlModal.onClose();
				} else {
					toast.update(toastIdRef.current, { description: "Ocorreu um erro", status: "error" });
				}
			})}
		>
			<ModalBody>
				<Text mb={3}>Você tem certeza que deseja excluir o banco <strong>{params.name}</strong>? Esta ação não poderá ser desfeita.</Text>
			</ModalBody>

			<ModalFooter gap={4}>
				<Button type="button">Cancelar</Button>
				<Button type="submit" variant={"danger"}>Excluir</Button>
			</ModalFooter>
		</Box>
	)
}
