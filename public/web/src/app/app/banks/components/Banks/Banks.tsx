import { Button, Menu, MenuButton, MenuItem, MenuList, Td, Tr } from "@chakra-ui/react";
import { useMainContext } from "@feenanceiro/context";
import { BanksProps } from "@feenanceiro/types";
import { BsThreeDots } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { BanksForm } from "../Modal/BanksForm";
import { DeleteBank } from "../Modal/BanksDelete";

export function Banks(params: Readonly<BanksProps>){
	const { controlModal, setModalComponent } = useMainContext();

	return (
		<Tr>
			<Td>
				<strong>{params.name}</strong>
			</Td>
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
									title: "Editar banco",
									bodyComponent: <BanksForm edit={params} />
								});

								controlModal.onOpen();
							}}
						>Editar</MenuItem>

						<MenuItem
							icon={<FiX />}
							onClick={() => {
								setModalComponent({
									title: "Excluir banco",
									bodyComponent: <DeleteBank {...params} />
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
