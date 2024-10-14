"use client";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
	const route = useRouter();

	useEffect(() => {
		route.push('/login');
	}, [])

	return (
		<Box bgColor={"danger.400"}>
			<h1>Página de apresentação da plataforma</h1>
		</Box>
	);
}
