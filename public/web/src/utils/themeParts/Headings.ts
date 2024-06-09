import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

function headingSettings(size: string, bold: boolean){
	return {
		fontSize: size,
		fontWeight: bold && "bold",
		color: "typo.500"
	}
}

const h1 = defineStyle({
	...headingSettings("32px", true),
})

const h2 = defineStyle({
	...headingSettings("24px", true),
})

const h3 = defineStyle({
	...headingSettings("20px", true),
})

const h4 = defineStyle({
	...headingSettings("18px", true),
})

const h5 = defineStyle({
	...headingSettings("14px", true),
})

const h6 = defineStyle({
	...headingSettings("10px", true),
})

export const headingTheme = defineStyleConfig({
	variants: {
		"h1": h1,
		"h2": h2,
		"h3": h3,
		"h4": h4,
		"h5": h5,
		"h6": h6,
	},
})
