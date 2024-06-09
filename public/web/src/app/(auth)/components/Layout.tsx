"use cliente";

import { Box, Flex } from "@chakra-ui/react";
import LogoWhite from "../../../../public/logo-white.svg";
import Image from "next/image";

export function LayoutAuth({children}: Readonly<{children: React.ReactNode}>){
	return (
		<Flex
			h={"100vh"}
			alignItems={"center"}
			justifyContent={"center"}
			bgGradient={'linear(to-b, primary.500, primary.400)'}
		>
			<div>
				<Box
					maxW={"350px"}
					mb={5}
				>
					<Image src={LogoWhite} alt="Feenanceiro" />
				</Box>

				<Box
					bgColor={"white"}
					p={4}
					borderRadius={5}
				>
					{children}
				</Box>
			</div>
		</Flex>
	)
}
