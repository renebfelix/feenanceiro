"use client";

import { EmptySpace } from "@/app/app/components/EmptySpace/EmptySpace";
import { StatsCard } from "@/components/StatsCard/StatsCard";
import { Box, Button, Flex, Heading, Input, Skeleton, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { ShareProps } from "@feenanceiro/types";
import { formatDateBasic, fullMonthsName, moneyCurrency } from "@feenanceiro/utils";
import moment from "moment";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FiDollarSign } from "react-icons/fi";

function saldoDevedor(gasto?: number, entrada?: number, pago?: number){
	const totalPago = pago ?? 0;
	const totalGasto = gasto ?? 0;
	const totalEntrada = entrada ??0;

	return (totalGasto - totalEntrada) - totalPago;
}


export default function SharePage(){
	const queryParams = useSearchParams();
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<boolean>(false);
	const [data, setData] = useState<ShareProps>();
	const { register, handleSubmit, setValue } = useForm();
	const router = useRouter();

	function redirectPeriod(period: string){
		let url = `?user=${queryParams.get('user')}&responsable=${queryParams.get('responsable')}&period=${period}`;
		router.push(`/share${url}`);
	}

	async function getBills(){
		setLoading(true);

		const period = queryParams.get('period');
		const user = queryParams.get('user');
		const responsable = queryParams.get('responsable');

		const response = await fetch(`${process.env.API_HOST}/share?user=${user}&responsable=${responsable}&period=${period}`, {
			cache: "no-cache",
		});

		if (response.ok){
			const data = await response.json();
			setData(data);
		} else {
			setError(true);
		}

		setLoading(false);
	}

	function handlerFilters(data: FieldValues, event: any){
		event.preventDefault();
		redirectPeriod(data.period)
	}

	useEffect(() => {
		const period = queryParams.get("period");

		if (!period) {
			redirectPeriod(moment().format("YYYY-MM"));
		} else {
			setValue("period", period)
			getBills();
		}
	}, [queryParams]);

	if (loading) {
		return (
			<Box
				px={{ base: 2, md: 4 }}
				py={'5'}
				border={'1px solid'}
				background={"white"}
				borderColor={'gray.200'}
				rounded={'lg'}
				mb={4}
			>
				<Skeleton height={250} width={"full"} />
			</Box>
		)
	}

	if(error) {
		return (
			<Box
				px={{ base: 2, md: 4 }}
				py={'5'}
				border={'1px solid'}
				background={"white"}
				borderColor={'gray.200'}
				rounded={'lg'}
				mb={4}
			>
				<EmptySpace decription="Ocorreu um erro. Tente novamente" variant="DANGER"></EmptySpace>
			</Box>
		)
	}

	return (
		<>
			<Box
				px={{ base: 2, md: 4 }}
				py={'5'}
				border={'1px solid'}
				background={"white"}
				borderColor={'gray.200'}
				rounded={'lg'}
				mb={4}
			>
				<Heading mb={3}>Olá, {data?.infos.responsable}!</Heading>
				<Text>Aqui estão os gastos que <strong>{data?.infos.mainUser}</strong> compartilhou com você.</Text>
			</Box>

			<Flex gap={5} mb={5} flexWrap={"wrap"} flexDirection={{
				base: "column",
				md: "row"
			}}>
				<StatsCard
					icon={<FiDollarSign />}
					stat={moneyCurrency(data?.meta.totalGasto)}
					title={"Total a pagar"}
				/>

				<StatsCard
					icon={<FiDollarSign />}
					stat={moneyCurrency(data?.meta.totalPago)}
					title={"Valor pago"}
				/>

				<StatsCard
					icon={<FiDollarSign />}
					stat={moneyCurrency(saldoDevedor(data?.meta.totalGasto, data?.meta.totalEntradas, data?.meta.totalPago))}
					title={"Saldo devedor"}
				/>
			</Flex>

			<Flex flexWrap={"wrap"} justifyContent={"space-between"} alignItems={"center"} mb={5} gap={5}>
				<Heading>
					{fullMonthsName[moment(queryParams.get("period")?.toString(), "YYYY-MM").get('M')]} - {queryParams.get("year") ?? moment().get("year")}
				</Heading>

				<Box maxWidth={"600px"} width={"100%"} border={"1px solid gray.200"} p={4}>
					<form onSubmit={handleSubmit((data, event) => handlerFilters(data, event))}>
						<Flex gap={4} alignItems={"center"} justifyContent={"flex-end"}>
							<Input background={"white"} type="month" {...register("period")} />
							<Button colorScheme="primary" px={8} type="submit">Fatura</Button>
						</Flex>
					</form>
				</Box>
			</Flex>

			<TableContainer bgColor={"white"} padding={3}>
				<Table variant="striped" colorScheme={"gray"} bgcolor="white">
					<TableCaption>Feenanceiro - Controle suas finanças - {moment().format("Y")} &copy;</TableCaption>

					{data && data.items.length > 0 && (
						<Thead bgColor={"white"}>
							<Tr>
								<Th>Data</Th>
								<Th>Descrição</Th>
								<Th isNumeric>Valor</Th>
								<Th>Forma</Th>
							</Tr>
						</Thead>
					)}

					<Tbody>
						{data && data.items.length <= 0 ? (
							<Tr>
								<Td colSpan={8}>
									<EmptySpace decription="Não há lançamentos" variant="DEFAULT"></EmptySpace>
								</Td>
							</Tr>
						) : (
							<>
								{data?.items.map((bill) => {
									return (
										<Tr key={bill.id}>
											<Td>{formatDateBasic(bill.dateValue ?? bill.info.dateInfo)}</Td>
											<Td>{bill.info.title}</Td>
											<Td isNumeric color={bill.info.method === "ENTRADA" ? "green.600" : "red.400"} fontWeight={"semibold"}>

												{moneyCurrency(bill.value)}
											</Td>
											<Td>
												{bill.info.type === "PARCELADA" ? bill.parcel.current+"/"+bill.parcel.total : bill.info.type}
											</Td>
										</Tr>
									)
								})}
							</>
						)}
					</Tbody>
				</Table>
			</TableContainer>
		</>
	)
}
