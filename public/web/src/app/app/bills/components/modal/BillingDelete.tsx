"use client";
import { getFetchGeneral } from "@/app/services/fetchs/getFetchGeneral";
import { Notification } from "@/components/Notification/Notification";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useMainContext } from "@feenanceiro/context";
import { BillProps } from "@feenanceiro/types";
import { useState } from "react";

export function BillingDelete(params: Readonly<BillProps>){
	const { controlModal, refreshBillings } = useMainContext();
	const [disabled, setDisabled] = useState(false);
	const [errorResponse, setErrorResponse] = useState({
		code: 0,
		message: ""
	});

	async function handleDeleteBilling(params: BillProps){
		setDisabled(true);

		const response = await getFetchGeneral({
			method: "DELETE",
			url: `/app/bill/${params.id}`,
			data: {
				"toDelete": "VALOR"
			}
		});

		if (response.status === 200){
			controlModal.onClose();
			refreshBillings?.current?.click();
		} else {
			const dataResponse = await response.json();
			setErrorResponse(dataResponse);
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


			{errorResponse.code > 0 && (
				<Notification
					status={"error"}
					message={"Ocorreu um erro, tente novamente."}
					error={errorResponse.code}
				/>
			)}

			<Flex gap={5} mt={5} justifyContent={"flex-end"}>
				<Button variant={"ghost"} onClick={() => controlModal.onClose()}>Cancelar</Button>
				<Button isDisabled={disabled} variant={"danger"} onClick={() => handleDeleteBilling(params)} >Excluir</Button>
			</Flex>
		</Box>
	)
}
