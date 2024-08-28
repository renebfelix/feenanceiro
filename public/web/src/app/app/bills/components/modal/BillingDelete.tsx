"use client";
import { getFetchGeneral } from "@/app/services/fetchs/getFetchGeneral";
import { Box, Button, Flex, Select, Text, useToast } from "@chakra-ui/react";
import { useMainContext } from "@feenanceiro/context";
import { BillProps } from "@feenanceiro/types";
import { useRef, useState } from "react";

export function BillingDelete(params: Readonly<BillProps>){
	const toast = useToast();
  	const toastIdRef = useRef<any>();

	const { controlModal, refreshBillings } = useMainContext();
	const [disabled, setDisabled] = useState(false);
	const [deleteBill, setDeleteBill] = useState("VALOR");

	async function handleDeleteBilling(params: BillProps){
		setDisabled(true);
		toastIdRef.current = toast({ description: 'Excluindo', position: "top-right", isClosable: true, duration: 3000 });

		const response = await getFetchGeneral({
			method: "DELETE",
			url: `/app/bill/${params.id}`,
			data: {
				"toDelete": deleteBill
			}
		});

		if (response.status === 200){
			toast.update(toastIdRef.current, { description: "Excluído com sucesso", status: "success" });
			controlModal.onClose();
			refreshBillings?.current?.click();
		} else {
			toast.update(toastIdRef.current, { description: "Ocorreu um erro", status: "error" });
		}

		setDisabled(false);

	}

	return (
		<Box p={5}>
			<Text mb={3}>Você tem certeza que deseja excluir o item <strong>{params.info.title}</strong>? Esta ação não poderá ser desfeita.</Text>

			{params.info.type === 'FIXA' && (
				<Box bgColor={"danger.100"} p={2}>
					<Text fontWeight={"bold"} color={"danger.400"}>Atenção!</Text>
					<Text fontSize={"14px"}>Este é um gasto fixo e será excluído de todas as faturas, inclusive as já fechadas.</Text>
				</Box>
			)}


			{params.parcel.total > 1 && (
				<Select onChange={(e) => setDeleteBill(e.target.value)}>
					<option value={"VALOR"}>Apenas parcela atual</option>
					<option value={"GERAL"}>Todas as parcelas</option>
				</Select>
			)}

			<Flex gap={5} mt={5} justifyContent={"flex-end"}>
				<Button variant={"ghost"} onClick={() => controlModal.onClose()}>Cancelar</Button>
				<Button isDisabled={disabled} variant={"danger"} onClick={() => handleDeleteBilling(params)} >Excluir</Button>
			</Flex>
		</Box>
	)
}
