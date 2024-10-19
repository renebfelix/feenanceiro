import { Flex, FormControl, FormLabel, Input, Select, Button, IconButton, Textarea, ModalBody, ModalFooter, Box, useToast, Text } from "@chakra-ui/react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { CurrencyInput } from "react-currency-mask";
import { useMainContext } from "@feenanceiro/context";
import { FiPlus, FiTrash } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { hadleSubmitBill } from "../../functions/handleSubmitBill";
import { BillProps } from "@feenanceiro/types";
import moment from "moment";
import { ErrorLabel } from "@/components/ErrorLabel/ErrorLabel";

export function BillingModal({ editBill }: {editBill?: BillProps}){
	const toast = useToast();
  	const toastIdRef = useRef<any>();

	const [isParcel, setIsParcel] = useState(false);
	const { responsables, categories, cards, banks, refreshBillings, controlModal } = useMainContext();
	const { control, register, handleSubmit, reset, formState: { errors }, setValue } = useForm();
	const { append, remove, fields } = useFieldArray({
		control,
		name: "division",
		rules: {
			required: {
				value: true,
				message: "Campo obrigatório"
			},
			minLength: 1
		}
	});

	useEffect(() => {
		if (editBill){
			setValue("valueType", editBill.info.method);
			setValue("description", editBill.info.title);
			setValue("value", editBill.info.value);
			setValue("date", moment(editBill.info.dateInfo).format("YYYY-MM-DD"));
			setValue("type", editBill.info.type);
			setValue("parcels", editBill.parcel.total);
			setValue("payment", editBill.payment.id);
			setValue("category", editBill.category.id);
			setValue("observation", editBill.info.description);
		}
	}, [editBill])

	return (
		<Box as="form" onSubmit={handleSubmit(async (data, event) => {
			toastIdRef.current = toast({ description: 'Adicionando...', position: "top-right", isClosable: true, duration: 3000 });

			const response = await hadleSubmitBill(data, event);
			const dataResponse = await response.json();

			if (response.ok){
				toast.update(toastIdRef.current, { description: dataResponse.message, status: "success" });
				reset();
				remove();
				refreshBillings?.current?.click();
			} else {
				toast.update(toastIdRef.current, { description: dataResponse.message, status: "error" });
			}
		})}>
			<ModalBody>
				<FormControl mb={3}>
					<FormLabel>Tipo:</FormLabel>
					<Select {...register("valueType", {
						required: {
							value: true,
							message: "Campo obrigatório"
						},
					})}>
						<option value={""}>Selecione</option>
						<option value={"SAIDA"}>Gasto (Saída)</option>
						<option value={"ENTRADA"}>Recebidos (Entradas)</option>
					</Select>

					{errors.valueType && <ErrorLabel errors={errors.valueType} />}
				</FormControl>

				<Flex gap={4}>
					<FormControl mb={3}>
						<FormLabel>Nome:</FormLabel>
						<Input
							type="text"
							{...register("description", {
								required: {
									value: true,
									message: "Campo obrigatório"
								}
							})}
						/>

						{errors.description && <ErrorLabel errors={errors.description} />}
					</FormControl>

					<FormControl mb={3}>
						<FormLabel>Valor:</FormLabel>
						<Controller
							name="value"
							control={control}
							rules={{
								required: {
									value: true,
									message: "Campo obrigatório"
								}
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
						{errors.value && <ErrorLabel errors={errors.value} />}
					</FormControl>
				</Flex>

				<Flex gap={4}>
					<FormControl mb={3}>
						<FormLabel>Data:</FormLabel>
						<Input
							type="date"
							{...register("date", {
								required: {
									value: true,
									message: "Campo obrigatório"
								}
							})}
						/>
						{errors.date && <ErrorLabel errors={errors.date} />}
					</FormControl>

					<FormControl mb={3}>
						<FormLabel>Forma:</FormLabel>
						<Select {...register("type",
							{
								required: {
									value: true,
									message: "Campo obrigatório"
								},
								onChange: (e) => {
									setIsParcel(e.target.value === "PARCELADA");
								}
							})}
						>
							<option value={""}>Selecione</option>
							<option value={"UNICA"}>Única</option>
							<option value={"PARCELADA"}>Parcelada</option>
							<option value={"FIXA"}>Fixa</option>
						</Select>
						{errors.type && <ErrorLabel errors={errors.type} />}
					</FormControl>

					{isParcel && (
						<FormControl mb={3}>
							<FormLabel>Nº Parcelas:</FormLabel>
							<Input
								type="number"
								{...register("parcels", {
									required: {
										value: true,
										message: "Campo obrigatório"
									}
								})}
							/>
							{errors.parcels && <ErrorLabel errors={errors.parcels} />}
						</FormControl>
					)}
				</Flex>

				<Flex gap={4}>
					<FormControl mb={3}>
						<FormLabel>Metódo:</FormLabel>
						<Select
							disabled={cards.status.isLoading}
							{...register("payment", {
								required: {
									value: true,
									message: "Campo obrigatório"
								}
							})}
						>
							{cards.status.isLoading && banks.status.isLoading ? (
								<option value={""}>Carregando</option>
							) : (
								<>
									<option value={""}>Selecione</option>
									<optgroup label="Cartões">
										{cards.data.map((card) => {
											return <option key={card.id} value={card.id}>{card.name}</option>
										})}
									</optgroup>

									<optgroup label="Bancos">
										{banks.data.map((bank) => {
											return <option key={bank.id} value={bank.id}>{bank.name}</option>
										})}
									</optgroup>
								</>
							) }
						</Select>
						{errors.payment && <ErrorLabel errors={errors.payment} />}
					</FormControl>

					<FormControl mb={3}>
						<FormLabel>Categoria:</FormLabel>

						<Select
							disabled={categories.status.isLoading}
							{...register("category", {
								required: {
									value: true,
									message: "Campo obrigatório"
								}
							})}
						>
							{categories.status.isLoading ? (
								<option value={""}>Carregando</option>
							) : (
								<>
									<option value={""}>Selecione</option>
									{categories.data.map((category) => {
										return <option key={category.id} value={category.id}>{category.name}</option>
									})}
								</>
							) }
						</Select>
						{errors.category && <ErrorLabel errors={errors.category} />}
					</FormControl>
				</Flex>

				<Box gap={4}>
					<FormControl mb={3}>
						<FormLabel>Responsáveis:</FormLabel>

						<Flex gap={4} flexDirection={"column"}>
							{fields.map((field, index) => (
								<Controller
									name={`division[${index}]`}
									key={field.id}
									control={control}
									rules={{
										required: {
											value: true,
											message: "Campo obrigatório"
										},
									}}
									render={({field}) => (
										<Flex gap={4}>
											<Select {...field}>
												<option value="">Selecione</option>
												{responsables.data.map((responsable) => {
													return <option value={responsable.id} key={responsable.id}>{responsable.name}</option>
												})}
											</Select>

											<IconButton
												aria-label="Remover"
												icon={<FiTrash />}
												onClick={() => remove(index)}
											/>
										</Flex>
									)}
								></Controller>
							))}
						</Flex>

						{errors.division && <ErrorLabel errors={errors.division} />}

						<Button size={"xs"} leftIcon={<FiPlus />} my={3} type="button" onClick={() => append("")}>Adicionar</Button>
					</FormControl>
				</Box>

				<FormControl>
					<FormLabel>Descrição:</FormLabel>
					<Textarea
						size='sm'
						resize={"none"}
						{...register("observation")}
					/>
				</FormControl>
			</ModalBody>

			<ModalFooter borderTop={"1px solid"} borderTopColor={"neutral.100"} gap={3}>
				<Button type="button" onClick={() => controlModal.onClose()}>Cancelar</Button>
				<Button type="submit" variant={"primary"}>Cadastrar</Button>
			</ModalFooter>
		</Box>
	)
}
