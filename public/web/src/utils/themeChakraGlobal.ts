import { extendTheme } from "@chakra-ui/react";

export const themeChakraGlobal = extendTheme({
	colors: {
		primary: {
			100: "#F2D5FF",
			200: "#D3B4FA",
			300: "#A083D7",
			400: "#8E68F1",
			500: "#4A349B",
		},
		secundary: {
			100: "#C8E5FF",
			200: "#B2D3FF",
			300: "#85A9FF",
			400: "#79B5FF",
			500: "#336BFF",
		},
		success: {
			100: "#E5F2F0",
			200: "#D7E9D7",
			300: "#57DDB7",
			400: "#51D79A",
			500: "#189947",
		},
		danger: {
			100: "#FFD4E6",
			200: "#FFB3B3",
			300: "#FF7979",
			400: "#E63946",
			500: "#BA2737",
		},
		warning: {
			100: "#F2F0E3",
			200: "#F7E1B5",
			300: "#FFDB74",
			400: "#FFE45C",
			500: "#B38A18",
		},
		neutral: {
			100: "#E5F0F8",
			200: "#D8E3F1",
			300: "#B4C4D6",
			400: "#A7B6CC",
			500: "#6A7F95",
		},
		typo: {
			100: "#909090",
			200: "#5C5C5C",
			300: "#4B4B4B",
			400: "#3D3D3D",
			500: "#191919",
		},
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
			h1: {
				fontSize: "32px",
				fontWeight: "bold",
				color: "typo.500"
			},
			h2: {
				fontSize: "24px",
				fontWeight: "bold",
				color: "typo.500"
			},
			h3: {
				fontSize: "20px",
				fontWeight: "bold",
				color: "typo.500"
			},
			h4: {
				fontSize: "18px",
				color: "typo.500"
			},
			h5: {
				fontSize: "14px",
				color: "typo.500"
			},
			h6: {
				fontSize: "10px",
				color: "typo.500"
			},
		}
	}
})
