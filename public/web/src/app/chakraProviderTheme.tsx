"use client";

import { themeChakraGlobal } from "@/utils/themeChakraGlobal";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";

export function ChakraThemeEdit({children}: Readonly<{children: React.ReactNode}>){
	return <ChakraProvider theme={themeChakraGlobal}>{children}</ChakraProvider>
}
