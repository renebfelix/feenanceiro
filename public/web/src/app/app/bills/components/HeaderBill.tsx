import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { useBillsContext, useMainContext } from "@feenanceiro/context";
import { fullMonthsName } from "@feenanceiro/utils";
import moment from "moment";
import { useRouter, useSearchParams } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export function HeaderBill(){
	const searchParams = useSearchParams();
	const period = searchParams.get("period");
	const splitPeriod: Array<string> | undefined = period?.split('-');
	const route = useRouter();
	const { status } = useBillsContext();

	function prevMonth(): string{
		if (period){
			return moment(period, "YYYY-MM").subtract(1, "M").format("YYYY-MM");
		} else {
			return moment().subtract(1, "M").format("YYYY-MM");
		}
	}

	function nextMonth(): string{
		if (period){
			return moment(period, "YYYY-MM").add(1, "M").format("YYYY-MM");
		} else {
			return moment().add(1, "M").format("YYYY-MM");
		}
	}

	return (
		<Flex my={4} gap={2} width={"100%"} alignItems={"center"}>
			<Flex alignItems={"center"} justifyContent={"center"} rounded={'lg'} w={50}>
				<IconButton
					isDisabled={status.isLoading}
					onClick={() => {
						route.push(`?period=${prevMonth()}`)
					}}
					variant={"ghost"}
					aria-label="next"
					icon={<FaChevronLeft />}
				/>
			</Flex>

			<Box height={"40px"} bgColor={"white"} px={3} rounded={'lg'} w={"full"}>
				<Text textAlign={"center"} fontWeight={"bold"} height={"40px"} lineHeight={"40px"}>
					{
						!splitPeriod ?
							fullMonthsName[Number(moment().format("M")) - 1]+" de "+moment().format("YYYY")
						:
							splitPeriod && fullMonthsName[Number(splitPeriod[1]) - 1]+" de "+splitPeriod[0]
					}
				</Text>
			</Box>

			<Flex alignItems={"center"} justifyContent={"center"} rounded={'lg'} w={50}>
				<IconButton
					isDisabled={status.isLoading}
					onClick={() => {
						route.push(`?period=${nextMonth()}`)
					}}
					variant={"ghost"}
					aria-label="next"
					icon={<FaChevronRight />}
				/>
			</Flex>
		</Flex>
	)
}
