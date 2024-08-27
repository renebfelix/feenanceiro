"use client";

import { Button, Flex, Heading, IconButton, Tooltip } from "@chakra-ui/react";
import { Filter } from "./components/Filter";
import { LegacyRef, Suspense, useEffect, useRef } from "react";
import { fetchBills } from "@/app/services/fetchs/fetchBills";
import { useBillsContext, useMainContext } from "@feenanceiro/context";
import { FiPlus, FiRefreshCw } from "react-icons/fi";
import { useSearchParams } from "next/navigation";
import { ListBills } from "./components/ListBills";
import { CardsValues } from "./components/RowCardsValues";
import { BillingModal } from "./components/modal/BillingModal";
import { HeaderBill } from "./components/HeaderBill";

export default function BillsPage(){
	const { setMeta, setItems, setStatus } = useBillsContext();
	const { controlModal, setModalComponent, refreshBillings } = useMainContext();
	const searchParams = useSearchParams();

	async function getBills(){
		setStatus({
			hasError: false,
			isLoading: true,
		});

		const bills = await fetchBills(searchParams);

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
						<IconButton
							ref={refreshBillings}
							variant={"primary"}
							icon={<FiRefreshCw />}
							onClick={() => getBills()} aria-label="Atualizar"
						/>
					</Tooltip>

					<Button
						leftIcon={<FiPlus />}
						variant={"primary"}
						onClick={() => {
							setModalComponent({
								title: "Adicionar lançamento",
								bodyComponent: <BillingModal />
							})
							controlModal.onOpen();
						}}
					>
						Adicionar
					</Button>

					<Filter />
				</Flex>
			</Flex>

			<HeaderBill />

			<CardsValues />

			<Suspense>
				<ListBills />
			</Suspense>
		</>
	);
}
