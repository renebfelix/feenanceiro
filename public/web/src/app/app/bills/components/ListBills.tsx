import { Flex, Skeleton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { EmptySpace } from "../../components/EmptySpace/EmptySpace"
import { useBillsContext, useMainContext } from "@feenanceiro/context"
import { handleMarcarPago, handleUpdateList } from "../functions/handlePayed";
import { useSearchParams } from "next/navigation";
import moment from "moment";
import { ListBillItem } from "./ListBillItem";
import { BillingDetail } from "./modal/BillingDetail";
import { BillingDelete } from "./modal/BillingDelete";
import { BillingModal } from "./modal/BillingForm";
import { BillingStop } from "./modal/BillingStop";
import { useState } from "react";

export function ListBills(){
	const [idLoading, setIdLoading] = useState<Array<string>>([]);
	const { status, items, meta, edit, setItems, setMeta, setEdit } = useBillsContext();
	const searchParams = useSearchParams();
	const filterPeriod = searchParams?.get('period') ?? moment().format("YYYY-MM");
	const { controlModal, setModalComponent } = useMainContext();

	return (
		<Flex bgColor={"white"} p={5} rounded={'lg'} flexDirection={"column"} gap={3}>
			{status.isLoading ? <Skeleton width={"full"} height={"250px"} /> : (
				<TableContainer>
					<Table>
						<Thead>
							<Tr>
								<Th>Data</Th>
								<Th>Descrição</Th>
								<Th isNumeric>Valor</Th>
								<Th>Responsável</Th>
								<Th textAlign={"center"}>Parcelas</Th>
								<Th></Th>
							</Tr>
						</Thead>

						<Tbody>

							{!status.isLoading && !status.hasError && items.length >= 1 && (
								items.map((item) => {
									return (
										<ListBillItem
											isLoading={idLoading.includes(item.id)}
											onClickEdit={() => {
												setModalComponent({
													title: "Editar lançamento",
													bodyComponent: <BillingModal edit={item} />
												})
												controlModal.onOpen();
											}}

											onClickDetail={() => {
												setModalComponent({
													title: "Detalhe do lançamento",
													bodyComponent: <BillingDetail {...item} />
												})
												controlModal.onOpen();
											}}

											onClickPayed={async () => {
												let array = idLoading;
													array.push(item.id);

												setIdLoading(array);
												const response = await handleMarcarPago(item, filterPeriod);

												if (response) {
													const handlePlayesResult = handleUpdateList(items, meta, response);
													setItems(handlePlayesResult.items);
													setMeta(handlePlayesResult.meta);
													setIdLoading(idLoading.filter((idLoadingItem) => {
														if (idLoadingItem !== item.id){
															return idLoadingItem
														}
													}));
												}
											}}

											onClickDelete={() => {
												setModalComponent({
													title: "Excluir lançamento",
													bodyComponent: <BillingDelete {...item} />
												})
												controlModal.onOpen();
											}}

											onClickStop={() => {
												setModalComponent({
													title: "Interromper continuidade",
													bodyComponent: <BillingStop {...item} />
												})
												controlModal.onOpen();
											}}

											key={item.id} {...item}
										/>
									)
								})
							)}
						</Tbody>
					</Table>
				</TableContainer>
			)}

			{!status.isLoading && status.hasError && (
				<EmptySpace variant="DANGER" decription="Ocorreu um erro. Tente novamente" />
			)}

			{(!status.isLoading && !status.hasError && items.length <= 0) && (
				<EmptySpace variant="DEFAULT" decription="Não há lançamentos" />
			)}
		</Flex>
	)
}
