import { fetchBanks } from "@/app/services/fetchs";
import { getFetchGeneral } from "@/app/services/fetchs/getFetchGeneral";
import { ErrorLabel } from "@/components/ErrorLabel/ErrorLabel";
import { Box, Button, FormControl, FormLabel, Input, ModalBody, ModalFooter, useToast } from "@chakra-ui/react";
import { useMainContext } from "@feenanceiro/context";
import { BanksProps } from "@feenanceiro/types";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

export function BanksForm(params: Readonly<{ edit?: BanksProps }>){
	const { setBanks, controlModal } = useMainContext();
	const { handleSubmit, register, formState: { errors }, reset, setValue } = useForm();
	const toast = useToast();
	const toastIdRef = useRef<any>();

	useEffect(() => {
		if (params.edit){
			setValue("name", params.edit.name);
		}
	})

	return (
		<Box
			as="form"
			onSubmit={handleSubmit(async (data, event) => {
				toastIdRef.current = toast({ description: 'Adicionando...', position: "top-right", isClosable: true, duration: 3000 });

				const url = params.edit ? "/app/bank/"+params.edit.id : "/app/bank"

				const response = await getFetchGeneral({
					method: params.edit ? "PUT" : "POST",
					data: {
						...data,
						type: "CORRENTE"
					},
					url: url,
				});

				if (response.ok){
					toast.update(
						toastIdRef.current,
						{
							description: `${params.edit ? "Editado" : "Criado"} com sucesso.`,
							status: "success"
						}
					);

					const banks = await fetchBanks();

					if (!banks.status.hasError){
						setBanks(banks);
					}

					reset();
				} else {
					const dataResponse = await response.json();
					toast.update(toastIdRef.current, { description: dataResponse.message, status: "error" });
				}
			})}
		>
			<ModalBody>
				<FormControl mb={3}>
					<FormLabel>Nome do banco:</FormLabel>
					<Input
						type="text"
						{...register("name", {
							required: {
								value: true,
								message: "Campo obrigatório"
							}
						})}
					/>
					{errors.name && <ErrorLabel errors={errors.name} />}
				</FormControl>
			</ModalBody>

			<ModalFooter borderTop={"1px solid"} borderTopColor={"neutral.100"} gap={3}>
				<Button type="button" onClick={() => controlModal.onClose()}>Cancelar</Button>
				<Button type="submit" variant={"primary"}>
					{params.edit ? "Editar" : "Cadastrar"}
				</Button>
			</ModalFooter>
		</Box>
	)
}
