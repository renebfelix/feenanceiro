"use client";

import { Button, Flex, Heading, IconButton, Tooltip } from "@chakra-ui/react";
import { Filter } from "./components/Filter";
import { Suspense, useEffect } from "react";
import { fetchBills } from "@/app/services/fetchs/fetchBills";
import { useBillsContext, useMainContext } from "@feenanceiro/context";
import moment from "moment";
import { FiPlus, FiRefreshCw } from "react-icons/fi";
import { useSearchParams } from "next/navigation";
import { ListBills } from "./components/ListBills";
import { CardsValues } from "./components/RowCardsValues";
import { AddNewBill } from "./components/modal/NewBill";

export default function BillsPage(){
	const { setMeta, setItems, setStatus } = useBillsContext();
	const { controlModalBillings, setModalComponent } = useMainContext();
	const searchParams = useSearchParams();

	async function getBills(){
		setStatus({
			hasError: false,
			isLoading: true,
		});

		const bills = await fetchBills({
			period: searchParams?.get('period') ?? moment().format("YYYY-MM"),
			category: searchParams?.get('category') ?? undefined,
			responsable: searchParams?.get('responsable') ?? undefined,
			payment: searchParams?.get('payment') ?? undefined,
			method: searchParams?.get('method') ?? undefined,
			type: searchParams?.get('type') ?? undefined
		});

		setMeta(bills.meta);
		setItems(bills.items);
		setStatus(bills.status);
	}

	useEffect(() => {
		getBills();
	}, [searchParams]);

	return (
		<>
			<Flex w={"full"} gap={3} justifyContent={"space-between"} flexDirection={{base: "column", md: "row"}}>
				<Heading variant={"h1"} as={"h1"}>Lançamentos</Heading>

				<Flex gap={3} justifyContent={"flex-end"}>
					<Tooltip label="Atualizar">
						<IconButton variant={"primary"} icon={<FiRefreshCw />} onClick={() => getBills()} aria-label="Atualizar" />
					</Tooltip>

					<Button
						leftIcon={<FiPlus />}
						variant={"primary"}
						onClick={() => {
							setModalComponent({
								title: "Adicionar lançamento",
								bodyComponent: <AddNewBill />
							})
							controlModalBillings.onOpen();
						}}
					>Adicionar</Button>

					<Filter />
				</Flex>
			</Flex>

			<CardsValues />

			<Suspense>
				<ListBills />
			</Suspense>
		</>
	);
}
