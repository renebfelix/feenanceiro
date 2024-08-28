"use client";
import { Box, Button, Input, ModalFooter, Text, useToast } from "@chakra-ui/react";
import { BillProps } from "@feenanceiro/types";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { hadleStopBill } from "../../functions/hadleStopBill";
import { useMainContext } from "@feenanceiro/context";

export function BillingStop(params: BillProps){
	const toast = useToast();
  	const toastIdRef = useRef<any>();
	const { register, handleSubmit, reset, formState: { errors } } = useForm();
	const { controlModal, refreshBillings } = useMainContext();

	return (
		<Box
			as="form"
			onSubmit={
				handleSubmit(async (data, event) => {
					toastIdRef.current = toast({ description: 'Aguarde...', position: "top-right", isClosable: true, duration: 3000 });
					const response = await hadleStopBill(data, event, params);

					if (response.ok){
						toast.update(toastIdRef.current, { description: "Sucesso!", status: "success" });
						reset();
						controlModal.onClose();
						refreshBillings?.current?.click();
					} else {
						toast.update(toastIdRef.current, { description: "Ocorreu um erro. Tente novamente.", status: "error" });
					}
				})
			}
		>
			<Box p={5}>
				<Text mb={4}>Escolha a data que deseja interromper o gasto: <strong>{params.info.title}</strong></Text>

				<Input
					type="month"
					{...register("date", { required: true })}
				/>

				{errors.date && <Text variant={"error"}>Campo obrigatório</Text>}
			</Box>

			<ModalFooter borderTop={"1px solid"} borderTopColor={"neutral.100"} gap={3}>
				<Button type="button">Cancelar</Button>
				<Button type="submit" variant={"danger"}>Interromper</Button>
			</ModalFooter>
		</Box>
	)
}
