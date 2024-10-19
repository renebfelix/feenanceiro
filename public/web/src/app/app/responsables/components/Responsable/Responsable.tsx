import { Flex, Heading, Avatar, Box, Text, Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import { useMainContext } from "@feenanceiro/context";
import { ResponsableProps } from "@feenanceiro/types";
import { BsThreeDots } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { FiMail, FiX } from "react-icons/fi";
import { DeleteResponsable } from "../Modal/DeleteResponsable";
import { ResponsableForm } from "../Modal/ResponsableForm";

export function ResponsableCard(params: ResponsableProps){
	const { id, name, isInvited, isDefault, email, acceptedInvite } = params;
	const { controlModal, setModalComponent } = useMainContext();

	return (
		<Flex mb={3} border={"1px solid"} borderColor={"neutral.100"} rounded={"lg"} key={id} p={2} justifyContent={"space-between"} alignItems={"flex-start"}>
			<Flex gap={3}>
				<Box>
					<Avatar name={name} />
				</Box>

				<Flex flexDirection={"column"} gap={1} justifyContent={"center"}>
					<Flex gap={3} alignItems={"center"}>
						<Heading variant={"h4"}>{name}</Heading>
						<Text fontStyle={"italic"} fontSize={"12px"}>{isDefault && "(Principal)"}</Text>
					</Flex>

					{email && (
						<Flex gap={2} alignItems={"center"}>
							<FiMail />
							<Text>{email ?? "Sem e-mail"}</Text>
						</Flex>
					)}
				</Flex>
			</Flex>

			<Flex>
				<Menu>
					{!isDefault && (
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
					)}

					<MenuList>
						{/* <MenuItem icon={<FiInfo />}>Detalhes</MenuItem> */}

						<MenuItem
							icon={<FaRegEdit />}
							onClick={() => {
								setModalComponent({
									title: "Editar responsável",
									bodyComponent: <ResponsableForm edit={params} />
								});

								controlModal.onOpen();
							}}
						>Editar</MenuItem>

						{!isDefault && (
							<MenuItem
								icon={<FiX />}
								onClick={() => {
									setModalComponent({
										title: "Excluir responsável",
										bodyComponent: <DeleteResponsable {...params} />
									})

									controlModal.onOpen();
								}}
							>Excluir</MenuItem>
						)}


					</MenuList>
				</Menu>
			</Flex>
		</Flex>
	)
}
