import { Flex, Text } from "@chakra-ui/react";
import { FiAlertCircle, FiInfo, FiThumbsUp, FiX } from "react-icons/fi";

type variantsProps = "DEFAULT" | "SUCCESS" | "DANGER" | "WARNING";

function styleDesign(variant: variantsProps){
	switch(variant){
		case "DANGER":
			return {
				colorPrimary: "danger.500",
				colorSecundary: "danger.100",
				icon: <FiX />
			}
		case "SUCCESS":
			return {
				colorPrimary: "success.500",
				colorSecundary: "success.100",
				icon: <FiThumbsUp />
			}
		case "WARNING":
			return {
				colorPrimary: "warning.500",
				colorSecundary: "warning.100",
				icon: <FiAlertCircle />
			}
		default:
			return {
				colorPrimary: "secundary.500",
				colorSecundary: "secundary.100",
				icon: <FiInfo />
			}
	}
}

export function EmptySpace({ variant, decription }: Readonly<{variant: variantsProps; decription: string;}>){
	const style = styleDesign(variant);

	return (
		<Flex height={200} width={"full"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"} gap={4}>
			<Flex
				bgColor={style.colorSecundary}
				rounded={"100%"}
				width={"50px"}
				height={"50px"}
				justifyContent={"center"}
				alignItems={"center"}
				color={style.colorPrimary}
				fontSize={"30px"}
			>
				{style.icon}
			</Flex>

			<Text color={"typo.300"}>{decription}</Text>
		</Flex>
	)
}
