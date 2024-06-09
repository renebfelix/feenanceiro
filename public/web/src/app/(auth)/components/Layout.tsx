"use cliente";

import { Box, Flex, VStack } from "@chakra-ui/react";
import LogoWhite from "../../../../public/logo-white.svg";
import Image from "next/image";
import Link from "next/link";

export function LayoutAuth({children}: Readonly<{children: React.ReactNode}>){
	return (
		<Flex
			minH={"100vh"}
			bgGradient={'linear(to-b, primary.500, primary.400)'}
			overflow={"auto"}
			py={6}
		>
			<VStack
				maxW={"450px"}
				mx={"auto"}
				justifyContent={"center"}
			>
				<Box
					maxW={"300px"}
					mx={"auto"}
				>
					<Link href={"/"}>
						<Image src={LogoWhite} alt="Feenanceiro" />
					</Link>
				</Box>

				<Box
					bgColor={"white"}
					p={4}
					borderRadius={5}
					my={6}
				>
					{children}
				</Box>

				<Box textAlign={"center"}>
					<Link style={{color: "white"}} href={"/privacy"}>Política de privacidade</Link>
				</Box>
			</VStack>
		</Flex>
	)
}
