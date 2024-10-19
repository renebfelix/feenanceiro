"use client";

import { Tr, Td, Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import { useMainContext } from "@feenanceiro/context";
import { CategoriesPorps } from "@feenanceiro/types";
import { moneyCurrency } from "@feenanceiro/utils";
import { BsThreeDots } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { DeleteCategory } from "../modal/CategoryDelete";
import { CategoryForm } from "../modal/CategoryForm";

export function Category(params: Readonly<CategoriesPorps>) {
	const { controlModal, setModalComponent } = useMainContext();

	return (
		<Tr>
			<Td>
				<strong>{params.name}</strong>
			</Td>
			<Td isNumeric>
				<strong>{moneyCurrency(params.limit)}</strong>
			</Td>
			<Td isNumeric width={"50px"}>
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
									title: "Editar categoria",
									bodyComponent: <CategoryForm edit={params} />
								});

								controlModal.onOpen();
							}}
						>Editar</MenuItem>

						<MenuItem
							icon={<FiX />}
							onClick={() => {
								setModalComponent({
									title: "Excluir categoria",
									bodyComponent: <DeleteCategory {...params} />
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
