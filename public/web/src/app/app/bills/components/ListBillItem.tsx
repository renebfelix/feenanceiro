import { Button, Menu, MenuButton, MenuItem, MenuList, Td, Tr } from "@chakra-ui/react";
import { BillProps } from "@feenanceiro/types";
import moment from "moment";
import { BsThreeDots } from "react-icons/bs";
import { FiInfo, FiStopCircle, FiThumbsUp, FiX } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { moneyCurrency } from "../../../../../../api/utils/moneyCurrency";
import { typePayment } from "@feenanceiro/utils";

interface ActionsButtonsProps extends BillProps {
	onClickDetail?: () => void;
	onClickDelete?: () => void;
	onClickPayed?: () => Promise<any>;
	onClickEdit?: () => void;
	onClickStop?: () => void;
}

export function ListBillItem(params: Readonly<ActionsButtonsProps>){
	const {
		category, id, info, parcel, payment, responsable, value, dateValue,
		onClickDetail, onClickEdit, onClickPayed, onClickDelete, onClickStop
	} = params;

	return (
		<Tr bgColor={info.statusPayment === "PAGO" ? "success.200" : "white"}>
			<Td>
				{info.type === "FIXA" ? (
					moment(new Date(info.dateInfo ?? '')).format("DD/MM")
				) : (
					moment(new Date(dateValue ?? '')).format("DD/MM")
				)}
			</Td>
			<Td isTruncated>{info.title}</Td>
			<Td isNumeric fontWeight={"bold"} color={info.method === "SAIDA" ? "danger.400" : "success.500"}>
				{moneyCurrency(value)}
			</Td>
			<Td>{responsable.name}</Td>
			<Td textAlign={"center"}>
				{info.type === "PARCELADA" ? (
					parcel.current+"/"+parcel.total
				) : typePayment(info.type)}
			</Td>
			<Td>
				<Menu isLazy lazyBehavior="keepMounted">
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

						{info.type === "FIXA" && (
							<MenuItem onClick={onClickStop} icon={<FiStopCircle />}>Interromper continuidade</MenuItem>
						)}

						{info.method === "SAIDA" && (
							<MenuItem onClick={onClickPayed} icon={<FiThumbsUp />}>
								{info.statusPayment === "PAGO" ? "Marcar como em aberto" : "Marcar como pago"}
							</MenuItem>
						)}

						<MenuItem onClick={onClickEdit} icon={<FaRegEdit />}>Editar</MenuItem>
						<MenuItem onClick={onClickDelete} icon={<FiX />}>Excluir</MenuItem>
					</MenuList>
				</Menu>
			</Td>
		</Tr>
	)
}
