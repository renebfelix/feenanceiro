"use client";
import { Box, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LayoutAuth } from "./(auth)/components/Layout";

export default function Home() {
	const route = useRouter();

	useEffect(() => {
		route.push('/login');
	}, [])

	return (
		<LayoutAuth>
			<Box p={5}>
				<Spinner />
			</Box>
		</LayoutAuth>
	);
}
