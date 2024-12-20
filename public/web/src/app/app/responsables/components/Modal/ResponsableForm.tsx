"use client";
import { Box, Button, FormControl, FormLabel, Input, ModalBody, ModalFooter, Text, useToast } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { fetcResponsable } from "@/app/services/fetchs";
import { useMainContext } from "@feenanceiro/context";
import { ResponsableProps } from "@feenanceiro/types";
import { getFetchGeneral } from "@/app/services/fetchs/getFetchGeneral";
import { ErrorLabel } from "@/components/ErrorLabel/ErrorLabel";

export function ResponsableForm(params: Readonly<{ edit?: ResponsableProps }>){
	const { handleSubmit, register, reset, formState: { errors }, setValue } = useForm();
	const toast = useToast();
  	const toastIdRef = useRef<any>();
	const { setResponsables, controlModal } = useMainContext();

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

					if (params.edit) {
						controlModal.onClose();
					}

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
					{errors.name && <ErrorLabel errors={errors.name} />}
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
					{errors.email && <ErrorLabel errors={errors.email} />}
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
