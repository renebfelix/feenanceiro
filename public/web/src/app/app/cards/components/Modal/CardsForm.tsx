import { fetchCards } from "@/app/services/fetchs";
import { getFetchGeneral } from "@/app/services/fetchs/getFetchGeneral";
import { ErrorLabel } from "@/components/ErrorLabel/ErrorLabel";
import { OptionsNumbers } from "@/components/Options/OptionsNumbers";
import { Box, Button, Flex, FormControl, FormLabel, Input, ModalBody, ModalFooter, Select, Text, useToast } from "@chakra-ui/react";
import { useMainContext } from "@feenanceiro/context";
import { CardsProps } from "@feenanceiro/types";
import { useEffect, useRef } from "react";
import { CurrencyInput } from "react-currency-mask";
import { Controller, useForm } from "react-hook-form";

export function CardsForm(params: Readonly<{ edit?: CardsProps }>){
	const { setCards } = useMainContext();
	const { handleSubmit, register, reset, formState: { errors }, setValue, control } = useForm();
	const toast = useToast();
  	const toastIdRef = useRef<any>();

	useEffect(() => {
		if (params.edit) {
			setValue("type", params.edit.type);
			setValue("name", params.edit.name);
			setValue("closingDate", params.edit.closingDate);
			setValue("dueCard", params.edit.dueDate);
			setValue("limit", params.edit.limit);
		}
	}, [])

	return (
		<Box
			as="form"
			onSubmit={handleSubmit(async (data, event) => {
				toastIdRef.current = toast({ description: 'Adicionando...', position: "top-right", isClosable: true, duration: 3000 });

				const url = params.edit ? "/app/card/"+params.edit.id : "/app/card"

				const response = await getFetchGeneral({
					method: params.edit ? "PUT" : "POST",
					data: {
						...data,
						dueCard: Number(data.dueCard),
						closingDate: Number(data.closingDate),
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

					const cards = await fetchCards();

					if (!cards.status.hasError){
						setCards(cards);
					}

					reset();
				} else {
					const dataResponse = await response.json();
					toast.update(toastIdRef.current, { description: dataResponse.message, status: "error" });
				}


			})}
		>
			<ModalBody>
				<Flex justifyContent={"space-between"} gap={4}>
					<FormControl mb={3}>
						<FormLabel>Tipo:</FormLabel>
						<Select
							{...register("type", {
								required: {
									value: true,
									message: "Campo obrigatório"
								}
							})}
						>
							<option value="">Selecione</option>
							<option value="CREDITO">Crédito</option>
							<option value="DEBITO">Débito</option>
						</Select>

						{errors.type && <ErrorLabel errors={errors.type} />}
					</FormControl>

					<FormControl mb={3}>
						<FormLabel>Nome do cartão:</FormLabel>
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
				</Flex>

				<Flex justifyContent={"space-between"} gap={4}>
					<FormControl mb={3}>
						<FormLabel>Dia do fechamento:</FormLabel>
						<Select
							{...register("closingDate", {
								required: {
									value: true,
									message: "Campo obrigatório"
								}
							})}
						>
							<option value="">Selecione</option>
							<OptionsNumbers lastNumber={31} />
						</Select>

						{errors.closingDate && <ErrorLabel errors={errors.closingDate} />}
					</FormControl>

					<FormControl mb={3}>
						<FormLabel>Dia do vencimento:</FormLabel>

						<Select
							{...register("dueCard", {
								required: {
									value: true,
									message: "Campo obrigatório"
								}
							})}
						>
							<option value="">Selecione</option>
							<OptionsNumbers lastNumber={31} />
						</Select>

						{errors.dueCard && <ErrorLabel errors={errors.dueCard} />}
					</FormControl>

					<FormControl mb={3}>
						<FormLabel>Limite (R$):</FormLabel>

						<Controller
							name="limit"
							control={control}
							rules={{
								required: true
							}}
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
				</Flex>
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
