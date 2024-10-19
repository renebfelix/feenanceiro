import { fetchCategories } from "@/app/services/fetchs";
import { getFetchGeneral } from "@/app/services/fetchs/getFetchGeneral";
import { ErrorLabel } from "@/components/ErrorLabel/ErrorLabel";
import { useToast, Box, ModalBody, FormControl, FormLabel, Input, ModalFooter, Button } from "@chakra-ui/react";
import { useMainContext } from "@feenanceiro/context";
import { CategoriesPorps } from "@feenanceiro/types";
import { useRef, useEffect } from "react";
import { CurrencyInput } from "react-currency-mask";
import { Controller, useForm } from "react-hook-form";

export function CategoryForm(params: Readonly<{ edit?: CategoriesPorps }>){
	const { setCategories, controlModal } = useMainContext();
	const { handleSubmit, register, formState: { errors }, reset, setValue, control } = useForm();
	const toast = useToast();
	const toastIdRef = useRef<any>();

	useEffect(() => {
		if (params.edit){
			setValue("name", params.edit.name);
			setValue("limit", params.edit.limit);
		}
	}, [])

	return (
		<Box
			as="form"
			onSubmit={handleSubmit(async (data, event) => {
				toastIdRef.current = toast({ description: 'Adicionando...', position: "top-right", isClosable: true, duration: 3000 });

				const url = params.edit ? "/app/category/"+params.edit.id : "/app/category"

				const response = await getFetchGeneral({
					method: params.edit ? "PUT" : "POST",
					data: data,
					url: url,
				});

				if (response.ok){
					toast.update(
						toastIdRef.current,
						{
							description: `${params.edit ? "Editada" : "Criada"} com sucesso.`,
							status: "success"
						}
					);

					if (params.edit) {
						controlModal.onClose();
					}

					const categories = await fetchCategories();

					if (!categories.status.hasError){
						setCategories(categories);
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
					<FormLabel>Nome da categoria:</FormLabel>
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
					<FormLabel>Limite (R$):</FormLabel>

					<Controller
						name="limit"
						control={control}
						render={({field}) => (
							<CurrencyInput
								value={field.value}
								InputElement={
									<Input type="text" {...field} />
								}
								onChangeValue={(_: any, value: any) => {
									field.onChange(value);
								}}
							></CurrencyInput>
						)}
					/>
					{errors.limit && <ErrorLabel errors={errors.limit} />}
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
