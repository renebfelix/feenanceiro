import { Avatar, Badge, Box, Button, Flex, Heading, Menu, MenuButton, MenuItem, MenuList, Text, Tooltip } from "@chakra-ui/react";
import { BillProps } from "@feenanceiro/types";
import moment from "moment";
import { moneyCurrency } from "../../../../../../api/utils/moneyCurrency";
import { BsThreeDots } from "react-icons/bs";
import { FiInfo, FiThumbsUp, FiX } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";

interface ActionsButtonsProps extends BillProps {
	onClickDetail?: () => void;
	onClickDelete?: () => void;
	onClickPayed?: () => Promise<any>;
	onClickEdit?: () => void;
}

export function CardBill(params: Readonly<ActionsButtonsProps>){
	const {
		category, id, info, parcel, payment, responsable, value, dateValue,
		onClickDetail, onClickEdit, onClickPayed, onClickDelete
	} = params;

	return (
		<Flex
			key={id}
			border="1px solid"
			bgColor={info.statusPayment === "PAGO" ? "success.100" : "white"}
			borderColor={"primary.100"}
			borderLeft={"5px solid"}
			borderLeftColor={info.method === "ENTRADA" ? "success.500" : "danger.500"}
			p={3}
			rounded={"lg"}
		>
			<Box pr={3}>
				<Tooltip label={responsable.name}>
					<Avatar name={responsable.name} size={"xs"}></Avatar>
				</Tooltip>
			</Box>

			<Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
				<Flex flexDirection={"column"} gap={1}>
					<Text fontSize={"sm"} color={"typo.300"}>
						{info.type === "FIXA" ? (
							moment(new Date(info.dateInfo ?? '')).format("DD/MM/YYYY")
						) : (
							moment(new Date(dateValue ?? '')).format("DD/MM/YYYY")
						)}
					</Text>

					<Heading variant={"h4"}>
						{info.title}
						{info.type === "PARCELADA" && (
							" - ("+parcel.current+"/"+parcel.total+")"
						)}
					</Heading>

					<Text>{info.description}</Text>

					<Flex gap={2}>
						<Badge fontSize='0.8em'>{category.name}</Badge>
						<Badge colorScheme="yellow" fontSize='0.8em'>{payment.name}</Badge>
					</Flex>
				</Flex>

				<Flex h={"100%"} flexDirection={"column"} justify={"space-between"} alignItems={"flex-end"}>
					<Flex gap={3}>
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
								<MenuItem onClick={onClickDetail} icon={<FiInfo />}>Detalhes</MenuItem>

								{info.method === "SAIDA" && (
									<MenuItem onClick={onClickPayed} icon={<FiThumbsUp />}>
										{info.statusPayment === "PAGO" ? "Marcar como em aberto" : "Marcar como pago"}
									</MenuItem>
								)}

								<MenuItem onClick={onClickEdit} icon={<FaRegEdit />}>Editar</MenuItem>
								<MenuItem onClick={onClickDelete} icon={<FiX />}>Excluir</MenuItem>
							</MenuList>
						</Menu>
					</Flex>

					<Heading variant={"h3"}>{moneyCurrency(value)}</Heading>
				</Flex>
			</Flex>
		</Flex>
	)
}
