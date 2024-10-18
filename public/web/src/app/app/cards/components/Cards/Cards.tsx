import { Button, Menu, MenuButton, MenuItem, MenuList, Td, Tr } from "@chakra-ui/react";
import { useMainContext } from "@feenanceiro/context";
import { CardsProps } from "@feenanceiro/types";
import { BsThreeDots } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { CardsForm } from "../Modal/CardsForm";
import { moneyCurrency } from "@feenanceiro/utils";
import { DeleteCard } from "../Modal/DeleteCard";

export function Cards(params: Readonly<CardsProps>){
	const { controlModal, setModalComponent } = useMainContext();

	return (
		<Tr>
			<Td>
				<strong>{params.name}</strong>
			</Td>
			<Td isNumeric>{params.closingDate}</Td>
			<Td isNumeric>{params.dueDate}</Td>
			<Td isNumeric>{moneyCurrency(params.limit)}</Td>
			<Td isNumeric>
				<Menu>
					<MenuButton
						as={Button}
						rounded={'full'}
						variant={'link'}
						cursor={'pointer'}
						minW={0}
						fontSize={"20px"}
					>
						<BsThreeDots />
					</MenuButton>

					<MenuList>
						<MenuItem
							icon={<FaRegEdit />}
							onClick={() => {
								setModalComponent({
									title: "Editar cartão",
									bodyComponent: <CardsForm edit={params} />
								});

								controlModal.onOpen();
							}}
						>Editar</MenuItem>

						<MenuItem
							icon={<FiX />}
							onClick={() => {
								setModalComponent({
									title: "Excluir cartão",
									bodyComponent: <DeleteCard {...params} />
								})

								controlModal.onOpen();
							}}
						>Excluir</MenuItem>
					</MenuList>
				</Menu>
			</Td>
		</Tr>
	)
}
