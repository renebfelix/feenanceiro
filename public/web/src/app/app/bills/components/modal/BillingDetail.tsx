import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { BillProps } from "@feenanceiro/types";
import { methodPayment, moneyCurrency, statusPayment } from "@feenanceiro/utils"
import moment from "moment";

function LineBilling(params: Readonly<{title: string, description: string | number | undefined}>){
	if (!params.description){
		return;
	} else {
		return (
			<Flex>
				<Text fontWeight={"bold"} mr={2}>{params.title}: </Text>
				<Text>{params.description}</Text>
			</Flex>
		)
	}
}

export function BillingDetail(params: Readonly<BillProps>){
	return (
		<Flex p={5} flexDirection={"column"} gap={1}>

			<LineBilling title="Nome" description={params.info.title} />
			<LineBilling title="Status" description={statusPayment(params.info.statusPayment)} />
			<LineBilling title="Tipo" description={methodPayment(params.info.method)} />
			<LineBilling title="Valor" description={moneyCurrency(params.info.value)} />

			{params.info.type === "PARCELADA" && (
				<LineBilling title="Parcela" description={params.parcel.current+"/"+params.parcel.total} />
			)}

			<LineBilling title="Categoria" description={params.category.name} />
			<LineBilling title="Pagamento" description={params.payment.name} />
			<LineBilling title="Responsável" description={params.responsable.name} />
			<LineBilling title="Data do lançamento" description={params.dateValue && moment(new Date(params.dateValue)).format("DD/MM/YYYY")} />
			<LineBilling title="Data criação" description={moment(new Date(params.info.dateInfo)).format("DD/MM/YYYY")} />

			<Divider my={2} />

			<Text fontWeight={"bold"} mr={2}>Observação: </Text>
			<Box bgColor="neutral.100" p={3}>
				{params.info.description}
			</Box>

			<Divider my={3} />

			<LineBilling title="ID lançamento" description={params.id} />
		</Flex>
	)
}
