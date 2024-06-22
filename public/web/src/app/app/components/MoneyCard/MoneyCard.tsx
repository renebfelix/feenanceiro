import { Box, Flex, Skeleton, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { MdOutlineAttachMoney } from "react-icons/md";
import { moneyCurrency } from "../../../../../../api/utils/moneyCurrency";

interface MoneyCardProps {
	title: string;
	value: number;
	loading: boolean;
	type: "ENTRADA" | "SAIDA" | "DEFAULT";
}

export function MoneyCard({ title, value, loading, type }: Readonly<MoneyCardProps>){
	return (
		<Stat
			px={{ base: 2, md: 4 }}
			py={'5'}
			rounded={'lg'}
			bgColor={"white"}
		>
			<Flex justifyContent={'space-between'}>
				<Box pl={{ base: 2, md: 4 }}>
					<StatLabel fontWeight={'medium'} isTruncated>
						{title}
					</StatLabel>
					<StatNumber fontSize={'2xl'} fontWeight={'medium'} color={type === "SAIDA" ? "danger.400" : type === "ENTRADA" ? 'success.500' : 'typo.500'}>
						{loading ? <Skeleton mt={2} height={"30px"} width={"full"}></Skeleton> : moneyCurrency(value)}
					</StatNumber>
				</Box>

				<Box
					my={'auto'}
					color={"typo.300"}
					alignContent={'center'}
				>
					<MdOutlineAttachMoney size={"40px"} />
				</Box>
			</Flex>
		</Stat>
	)
}
