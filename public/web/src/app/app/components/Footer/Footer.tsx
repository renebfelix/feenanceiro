import NextLink from "next/link";
import { Flex, Link, Text } from "@chakra-ui/react";
import moment from "moment";

export function Footer(){
	return (
		<Flex justifyContent={"center"} gap={3} mt={3}>
			<Text color={"primary.400"}>&copy; Feenanceiro {moment().format("YYYY")}</Text>
			<Text color={"primary.400"}>-</Text>
			<Link color={"primary.400"} as={NextLink} href="/privacy">Privacidade</Link>
		</Flex>
	)
}
