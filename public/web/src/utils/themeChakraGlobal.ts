import { extendTheme } from "@chakra-ui/react";

import { inputTheme } from "./themeParts/Input";
import { buttonTheme } from "./themeParts/Button";
import { colorsTheme } from "./themeParts/Colors";
import { headingTheme } from "./themeParts/Headings";
import { textTheme } from "./themeParts/Text";

export const themeChakraGlobal = extendTheme({
	colors: colorsTheme,
	components: {
		Input: inputTheme,
		Button: buttonTheme,
		Heading: headingTheme,
		Text: textTheme,
	},
	styles: {
		global: {
			html: {
				margin: 0,
				padding: 0,
				boxSizing: "border-box",
			},
			body: {
				bg: "#E5F0F8"
			},
			a: {
				color: "secundary.500"
			}
		}
	}
})
