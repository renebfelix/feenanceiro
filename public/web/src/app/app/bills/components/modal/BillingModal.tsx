import { Flex, FormControl, FormLabel, Input, Select, Button, IconButton, Textarea, ModalBody, ModalFooter, Box, useToast, position, Text } from "@chakra-ui/react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { CurrencyInput } from "react-currency-mask";
import { useBillsContext, useMainContext } from "@feenanceiro/context";
import { FiPlus, FiTrash } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { hadleSubmitBill } from "../../functions/handleSubmitBill";
import { fetchBills } from "@/app/services/fetchs/fetchBills";
import { useSearchParams } from "next/navigation";
import { BillProps } from "@feenanceiro/types";
import moment from "moment";

export function BillingModal({ editBill }: {editBill?: BillProps}){
	const toast = useToast();
  	const toastIdRef = useRef<any>();

	const searchParams = useSearchParams();
	const [isParcel, setIsParcel] = useState(false);
	const { responsables, categories, cards, banks, controlModal } = useMainContext();
	const { setMeta, setItems, setStatus, edit, setEdit } = useBillsContext();
	const { control, register, handleSubmit, reset, formState: { errors }, setValue } = useForm();
	const { append, remove, fields } = useFieldArray({
		control,
		name: "division",
		rules: {
			required: true,
			minLength: 1
		}
	});

	async function getBills(){
		setStatus({
			hasError: false,
			isLoading: true,
		});

		const bills = await fetchBills(searchParams);

		setMeta(bills.meta);
		setItems(bills.items);
		setStatus(bills.status);
	}

	function errorLabel(){
		return <Text variant={"error"}>Campo obrigatório</Text>;
	}

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
				getBills();
			} else {
				toast.update(toastIdRef.current, { description: dataResponse.message, status: "error" });
			}
		})}>
			<ModalBody>
				<FormControl mb={3}>
					<FormLabel>Tipo:</FormLabel>
					<Select {...register("valueType", { required: true })}>
						<option value={""}>Selecione</option>
						<option value={"SAIDA"}>Gasto (Saída)</option>
						<option value={"ENTRADA"}>Recebidos (Entradas)</option>
					</Select>

					{errors.valueType && errorLabel()}
				</FormControl>

				<Flex gap={4}>
					<FormControl mb={3}>
						<FormLabel>Nome:</FormLabel>
						<Input
							type="text"
							{...register("description", { required: true })}
						/>

						{errors.description && errorLabel()}
					</FormControl>

					<FormControl mb={3}>
						<FormLabel>Valor:</FormLabel>
						<Controller
							name="value"
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
						{errors.value && errorLabel()}
					</FormControl>
				</Flex>

				<Flex gap={4}>
					<FormControl mb={3}>
						<FormLabel>Data:</FormLabel>
						<Input
							type="date"
							{...register("date", { required: true })}
						/>
						{errors.date && errorLabel()}
					</FormControl>

					<FormControl mb={3}>
						<FormLabel>Forma:</FormLabel>
						<Select {...register("type",
							{
								required: true,
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
						{errors.type && errorLabel()}
					</FormControl>

					{isParcel && (
						<FormControl mb={3}>
							<FormLabel>Nº Parcelas:</FormLabel>
							<Input
								type="number"
								{...register("parcels", { required: true })}
							/>
							{errors.parcels && errorLabel()}
						</FormControl>
					)}
				</Flex>

				<Flex gap={4}>
					<FormControl mb={3}>
						<FormLabel>Metódo:</FormLabel>
						<Select
							disabled={cards.status.isLoading}
							{...register("payment", { required: true })}
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
						{errors.payment && errorLabel()}
					</FormControl>

					<FormControl mb={3}>
						<FormLabel>Categoria:</FormLabel>

						<Select
							disabled={categories.status.isLoading}
							{...register("category", { required: true })}
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
						{errors.category && errorLabel()}
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
										required: true,
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

						{errors.division && errorLabel()}

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
				<Button type="button">Cancelar</Button>
				<Button type="submit" variant={"primary"}>Cadastrar</Button>
			</ModalFooter>
		</Box>
	)
}
