"use client";

import { Box, Container } from "@chakra-ui/react";
import Image from "next/image";
import React, { Suspense } from "react";
import Logo from '../../../../public/logo-primary-500.svg';
import Link from "next/link";

export default function ShareLayout({children}: {children: React.ReactNode}){
	return (
		<Suspense>
			<Box minH="100vh" bg={'neutral.200'} py={7}>
				<Container maxW={"1080px"}>
					<Box mx={"auto"} maxW={"450px"} mb={"40px"}>
						<Link href={'/login'}>
							<Image alt="" src={Logo} />
						</Link>
					</Box>

					{children}
				</Container>
			</Box>
		</Suspense>
	)
}
