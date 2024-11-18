'use client'

import {
	Box,
	Flex,
	Stat,
	StatLabel,
	StatNumber,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

interface StatsCardProps {
	title: string
	stat: string
	icon: ReactNode
	type?: "SAIDA" | "ENTRADA"
}

export function StatsCard(props: StatsCardProps) {
	const { title, stat, icon } = props

	return (
		<Stat
			px={{ base: 2, md: 4 }}
			py={'5'}
			border={'1px solid'}
			background={"white"}
			borderColor={'gray.200'}
			rounded={'lg'}>
			<Flex justifyContent={'space-between'}>
				<Box pl={{ base: 2, md: 4 }}>
					<StatLabel fontWeight={'medium'} isTruncated>
						{title}
					</StatLabel>
					<StatNumber fontSize={'2xl'} fontWeight={'medium'}>
						{stat}
					</StatNumber>
				</Box>
				<Box
					my={'auto'}
					color={'gray.900'}
					alignContent={'center'}
				>
					{icon}
				</Box>
			</Flex>
		</Stat>
	)
}
