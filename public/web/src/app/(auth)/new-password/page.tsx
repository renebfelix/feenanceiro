"use client";

import { Flex, Skeleton } from "@chakra-ui/react";
import { InvalidReset } from "./components/invalidReset";
import { SuccessReset } from "./components/successReset";
import { handleCheckNewPassword } from "./handleCheckNewPassword";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function returnPage(successPage: boolean){
	switch(successPage) {
		case true:
			return <SuccessReset />;
		case false:
			return <InvalidReset />
	}
}

export default function NewPassword(){
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(true);
	const searchParams = useSearchParams();

	async function isValidPage(){
		const email = searchParams?.get('email') ?? undefined;
		const uuid = searchParams?.get('uuid') ?? undefined;

		const response = await handleCheckNewPassword(uuid, email);

		if (response.status === 200) {
			setSuccess(true)
		} else {
			setSuccess(false)
		}

		setLoading(false);
	}

	useEffect(() => {
		isValidPage();
	}, [])

	return (
		<Flex
			flexDir={"column"}
			alignItems={"center"}
			gap={4}
			minW={350}
		>
			{loading ? (
				<Skeleton w={"full"} height={200} />
			) : returnPage(success)}
		</Flex>
	)
}
