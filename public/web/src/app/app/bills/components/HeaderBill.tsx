import { Box, Text } from "@chakra-ui/react";
import { fullMonthsName } from "@feenanceiro/utils";
import moment from "moment";
import { useSearchParams } from "next/navigation";

export function HeaderBill(){
	const searchParams = useSearchParams();
	const period = searchParams.get("period");
	const splitPeriod: Array<string> | undefined = period?.split('-');

	return (
		<Box my={4} bgColor={"white"} p={3} rounded={'lg'} flexDirection={"column"} gap={3}>
			<Text textAlign={"center"} fontWeight={"bold"}>
				{
					!splitPeriod ?
						fullMonthsName[Number(moment().format("M")) - 1]+" de "+moment().format("YYYY")
				 	:
						splitPeriod && fullMonthsName[Number(splitPeriod[1]) - 1]+" de "+splitPeriod[0]
				}
			</Text>
		</Box>
	)
}
