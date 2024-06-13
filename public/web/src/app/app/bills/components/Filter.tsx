"use client";
import { Button, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Select } from "@chakra-ui/react";
import { useMainContext } from "@feenanceiro/context";
import { FiFilter } from "react-icons/fi";

export function Filter(){
	const { responsables, categories, banks, cards } = useMainContext();

	return (
		<Popover placement="bottom-end" closeOnBlur>
			<PopoverTrigger>
				<Button leftIcon={<FiFilter />} variant={"primary"}>Filtros</Button>
			</PopoverTrigger>

			<PopoverContent>
				<PopoverArrow />
				<PopoverHeader>Escolha os filtros</PopoverHeader>
				<PopoverCloseButton />

				<PopoverBody>
					<Select name="responsáveis">
						<option value="">{responsables.status.isLoading ? "Carregando..." : "Selecione"}</option>

						{!responsables.status.isLoading && responsables.data.map((responsable) => {
							return (
								<option
									key={responsable.idResponsable}
									value={responsable.idResponsable}
								>
									{responsable.nameResponsable}
								</option>
							);
						})}
					</Select>

					<Select name="category">
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

					<Select name="payment">
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

					<Button variant="primary">Aplicar</Button>
				</PopoverBody>
			</PopoverContent>
		</Popover>
	)
}
