"use client";

import { Box, Flex, HStack, Heading, IconButton, Skeleton, Tag, TagCloseButton, TagLabel, Text } from "@chakra-ui/react";
import { Filter } from "./components/Filter";
import { useEffect } from "react";
import { fetchBills } from "@/app/services/fetchs/fetchBills";
import { useBillsContext } from "@feenanceiro/context";
import moment from "moment";
import { moneyCurrency } from "../../../../../api/utils/moneyCurrency";
import { FiRefreshCw } from "react-icons/fi";

export default function BillsPage(){
	const { meta, setMeta, setItems, setStatus, status, items } = useBillsContext();

	async function getBills(){
		setStatus({
			hasError: false,
			isLoading: true,
		});

		const bills = await fetchBills({
			period: moment().format("MM-YYYY"),
		});

		setMeta(bills.meta);
		setItems(bills.items);
		setStatus(bills.status);
	}

	useEffect(() => {
		getBills()
	}, []);

	return (
		<>
			<Flex w={"full"} justifyContent={"space-between"}>
				<Heading variant={"h1"} as={"h1"}>Lançamentos</Heading>
				<Filter />
			</Flex>

			<HStack spacing={4} my={4}>
				<Text>Filtros aplicados:</Text>

				{['md'].map((size) => (
					<Tag
						size={size}
						key={size}
						variant='solid'
					>
						<TagLabel>Green</TagLabel>
						<TagCloseButton />
					</Tag>
				))}
			</HStack>

			<Box bgColor={"white"} p={5}>

				<IconButton icon={<FiRefreshCw />} onClick={() => getBills()} aria-label="Atualizar" />

				<Text><strong>Total gasto:</strong> {status.isLoading ? "Carregando..." : moneyCurrency(meta.totalGasto)}</Text>
				<Text mb={4}><strong>Total pago:</strong> {status.isLoading ? "Carregando..." : moneyCurrency(meta.totalPago)}</Text>

				{status.isLoading ? <Skeleton width={"full"} height={"250px"} /> : (
					items.map((item) => {
						return <Text key={item.id}>{item.info.title} - {moneyCurrency(item.value)}</Text>
					})
				)}
			</Box>
		</>
	);
}
