"use client";

import { Box, Flex, Heading, Link } from "@chakra-ui/react";
import { ReactNode } from "react";
import NextLink from "next/link";
import { FiUser } from "react-icons/fi";
import { MdOutlinePassword } from "react-icons/md";
import { usePathname } from "next/navigation";

function LinkSettings(text: string, href: string, isActive: boolean, icon?: ReactNode){
	return (
		<Box
			width={"full"}
			borderRadius={4}
			bgColor={isActive ? "primary.300" : "white"}
			color={isActive ? "white" : "black"}
			_hover={{
				backgroundColor: "primary.100",
			}}
		>
			<Link
				as={NextLink}
				href={href}
				p={3}
				display={"flex"}
				gap={3}
				alignItems={"center"}
				textDecorationLine={"none"}
				_hover={{
					textDecorationLine: "none",
					color: "black"
				}}
			>
				{icon}
				{text}
			</Link>
		</Box>
	)
}

export default function SettingsLayout({children}: Readonly<{children: ReactNode}>){
	const pathname = usePathname();

	return (
		<>
			<Heading mb={5} variant={"h1"} as={"h1"}>Configurações</Heading>

			<Flex gap={3}>
				<Flex flexDir={"column"} gap={2} minW={300} bgColor={"white"} borderRadius={8} p={4}>
					{LinkSettings(
						"Perfil",
						"/app/settings/account",
						pathname === "/app/settings/account",
						<FiUser />
					)}

					{LinkSettings(
						"Senha",
						"/app/settings/password",
						pathname === "/app/settings/password",
						<MdOutlinePassword />
					)}
				</Flex>

				<Box w={"full"} bgColor={"white"} borderRadius={8} p={4}>{children}</Box>
			</Flex>
		</>
	)
}
