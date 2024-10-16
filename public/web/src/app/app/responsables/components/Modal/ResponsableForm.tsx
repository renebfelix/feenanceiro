"use client";
import { Box, Button, FormControl, FormLabel, Input, ModalBody, ModalFooter, Text, useToast } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { hadleSubmitResponsable } from "../../functions/handleResponsable";
import { fetcResponsable } from "@/app/services/fetchs";
import { useMainContext } from "@feenanceiro/context";
import { ResponsableProps } from "@feenanceiro/types";
import { getFetchGeneral } from "@/app/services/fetchs/getFetchGeneral";

export function ResponsableForm(params: { edit?: ResponsableProps }){
	const { handleSubmit, register, reset, formState: { errors }, setValue } = useForm();
	const toast = useToast();
  	const toastIdRef = useRef<any>();
	const { setResponsables } = useMainContext();

	function errorLabel(errors: FieldValues){
		return <Text variant={"error"}>{`${errors.message}`}</Text>;
	}

	// Add values if the form it to edit
	useEffect(() => {
		if(params.edit){
			setValue("name", params.edit.name);
			setValue("email", params.edit.email);
		}
	}, []);

	return (
		<Box
			as="form"
			onSubmit={handleSubmit(async (data, event) => {
				toastIdRef.current = toast({ description: 'Adicionando...', position: "top-right", isClosable: true, duration: 3000 });

				const url = params.edit ? "/app/responsable/"+params.edit.id : "/app/responsable"

				const response = await getFetchGeneral({
					method: params.edit ? "PUT" : "POST",
					data: data,
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

					const responsables = await fetcResponsable();

					if (!responsables.status.hasError){
						setResponsables(responsables);
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
					<FormLabel>Nome:</FormLabel>
					<Input
						type="text"
						{...register("name", {
							required: {
								value: true,
								message: "Campo obrigatório"
							}
						})}
					/>
					{errors.name && errorLabel(errors.name)}
				</FormControl>

				<FormControl mb={3}>
					<FormLabel>Email:</FormLabel>
					<Input
						type="text"
						{...register("email", {
							pattern: {
								value: /\S+@\S+\.\S+/,
								message: "E-mail inválido"
							}
						})}
					/>
					{errors.email && errorLabel(errors.email)}
				</FormControl>
			</ModalBody>

			<ModalFooter borderTop={"1px solid"} borderTopColor={"neutral.100"} gap={3}>
				<Button type="button">Cancelar</Button>
				<Button type="submit" variant={"primary"}>
					{params.edit ? "Editar" : "Cadastrar"}
				</Button>
			</ModalFooter>
		</Box>
	)
}
