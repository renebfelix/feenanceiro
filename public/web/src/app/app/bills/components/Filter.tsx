"use client";
import {
	Button, Flex, Grid, Popover, PopoverArrow,
	PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger,
	Select, Input, FormControl, FormLabel,
	Box,
} from "@chakra-ui/react";
import { useMainContext } from "@feenanceiro/context";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { FiFilter } from "react-icons/fi";
import { handleFilters } from "../functions/handleFilters";
import { useEffect } from "react";

export function Filter(){
	const { responsables, categories, banks, cards } = useMainContext();
	const searchParams = useSearchParams();
	const { register, handleSubmit, setValue, reset } = useForm();
	const router = useRouter();

	useEffect(() => {
		setValue("responsable", searchParams?.get("responsable") ?? "");
		setValue("category", searchParams?.get("category") ?? "");
		setValue("payment", searchParams?.get("payment") ?? "");
		setValue("type", searchParams?.get("type") ?? "");
		setValue("period", searchParams?.get("period") ?? "");
		setValue("method", searchParams?.get("method") ?? "");
	}, [responsables, categories, banks, cards, searchParams]);

	return (
		<Popover placement="bottom-end" closeOnBlur>
			<PopoverTrigger>
				<Button leftIcon={<FiFilter />} variant={"primary"}>
					Filtros

					{searchParams.size >= 1 && (
						<Flex
							justifyContent={"center"}
							lineHeight={"20px"}
							ml={2}
							minW={"20px"}
							fontSize={"12px"}
							rounded={"lg"}
							color={"primary.500"}
							bgColor="primary.100"
						>{searchParams.size}</Flex>
					)}
				</Button>
			</PopoverTrigger>

			<PopoverContent width={{base: "sm", sm: "md", md: "lg"}}>
				<PopoverArrow />
				<PopoverHeader>Escolha os filtros</PopoverHeader>
				<PopoverCloseButton />

				<PopoverBody>
					<Box as="form" onSubmit={handleSubmit((data, event) => {
						console.log(handleFilters(data, event));
						router.push(`/app/bills?${handleFilters(data, event)}`);
					})}>
						<Grid columnGap={4} templateColumns={{base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)"}}>
							<FormControl mb={4}>
								<FormLabel>Responsável</FormLabel>

								<Select {...register("responsable")}>
									<option value="">{responsables.status.isLoading ? "Carregando..." : "Selecione"}</option>

									{!responsables.status.isLoading && responsables.data.map((responsable) => {
										return (
											<option
												key={responsable.id}
												value={responsable.id}
											>
												{responsable.name}
											</option>
										);
									})}
								</Select>
							</FormControl>

							<FormControl mb={4}>
								<FormLabel>Tipo de lançamento</FormLabel>

								<Select {...register("method")}>
									<option value="">Selecione</option>
									<option value="SAIDA">Saída</option>
									<option value="ENTRADA">Entrada</option>
								</Select>
							</FormControl>

							<FormControl mb={4}>
								<FormLabel>Tipo de pagamento</FormLabel>

								<Select {...register("type")}>
									<option value="">Selecione</option>
									<option value="UNICA">Única</option>
									<option value="FIXA">Fixa</option>
									<option value="PARCELADA">Parcelada</option>
								</Select>
							</FormControl>

							<FormControl mb={4}>
								<FormLabel>Categoria</FormLabel>

								<Select {...register("category")}>
									<option value="">{categories.status.isLoading ? "Carregando..." : "Selecione"}</option>

									{!categories.status.isLoading && categories.data.map((category) => {
										return (
											<option
												key={category.id}
												value={category.id}
											>
												{category.name}
											</option>
										);
									})}
								</Select>
							</FormControl>

							<FormControl mb={4}>
								<FormLabel>Forma de pagamento</FormLabel>

								<Select {...register("payment")}>
									<option value="">{cards.status.isLoading || banks.status.isLoading ? "Carregando..." : "Selecione"}</option>

									<optgroup label="Cartões de crédito">
										{!cards.status.isLoading && cards.data.map((card) => {
											return (
												<option
													key={card.id}
													value={card.id}
												>
													{card.name}
												</option>
											);
										})}
									</optgroup>

									<optgroup label="Contas bancárias">
										{!banks.status.isLoading && banks.data.map((bank) => {
											return (
												<option
													key={bank.id}
													value={bank.id}
												>
													{bank.name}
												</option>
											);
										})}
									</optgroup>
								</Select>
							</FormControl>

							<FormControl mb={4}>
								<FormLabel>Período</FormLabel>
								<Input {...register("period")} type="month" />
							</FormControl>
						</Grid>

						<Flex w="full" justifyContent={"flex-end"} gap={4}>
							<Button variant="ghost" onClick={() => reset()}>Limpar filtros</Button>
							<Button type="submit" variant="primary">Aplicar</Button>
						</Flex>
					</Box>
				</PopoverBody>
			</PopoverContent>
		</Popover>
	)
}
