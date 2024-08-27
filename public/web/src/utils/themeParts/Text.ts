import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const labelError = defineStyle({
	fontSize: "14px",
	color: "danger.500",
	marginTop: 1,
})

export const textTheme = defineStyleConfig({
	variants: {
		"error": labelError,
	},
})
