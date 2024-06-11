"use client";

import { Box } from "@chakra-ui/react";

export function HeaderApp(){
	return (
		<Box
			w={"full"}
			h="50px"
			bgColor={"primary.400"}
			position={"fixed"}
			zIndex={100}
		></Box>
	)
}
