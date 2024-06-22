import { Flex, Skeleton } from "@chakra-ui/react"
import { EmptySpace } from "../../components/EmptySpace/EmptySpace"
import { CardBill } from "../../components/CardBill/CardBill"
import { useBillsContext, useMainContext } from "@feenanceiro/context"
import { handleMarcarPago, handleUpdateList } from "../functions/handlePayed";
import { useSearchParams } from "next/navigation";
import moment from "moment";
import { EditModalBill } from "./modal/EditModal";

export function ListBills(){
	const { status, items, meta, setItems, setMeta } = useBillsContext();
	const searchParams = useSearchParams();
	const filterPeriod = searchParams?.get('period') ?? moment().format("YYYY-MM");
	const { controlModalBillings, setModalComponent } = useMainContext();

	return (
		<Flex bgColor={"white"} p={5} rounded={'lg'} flexDirection={"column"} gap={3}>
			{!status.isLoading && status.hasError && (
				<EmptySpace variant="DANGER" decription="Ocorreu um erro. Tente novamente" />
			)}

			{(!status.isLoading && !status.hasError && items.length <= 0) && (
				<EmptySpace variant="DEFAULT" decription="Não há lançamentos" />
			)}

			{status.isLoading && <Skeleton width={"full"} height={"250px"} />}

			{!status.isLoading && !status.hasError && items.length >= 1 && (
				items.map((item) => {
					return (
						<CardBill
							onClickEdit={() => {
								setModalComponent({
									title: "Editar lançamento",
									bodyComponent: <EditModalBill />
								})
								controlModalBillings.onOpen();
							}}
							onClickPayed={async () => {
								const response = await handleMarcarPago(item, filterPeriod);

								if (response) {
									const handlePlayesResult = handleUpdateList(items, meta, response);
									setItems(handlePlayesResult.items);
									setMeta(handlePlayesResult.meta);
								}
							}}
							key={item.id} {...item}
						/>
					)
				})
			)}
		</Flex>
	)
}
