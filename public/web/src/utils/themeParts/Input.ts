import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const {
	definePartsStyle,
	defineMultiStyleConfig
} = createMultiStyleConfigHelpers(inputAnatomy.keys)

const primary = definePartsStyle({
	field: {
		color: 'typo.500',
		bgColor: 'white',
		border: '1px',
		borderType: "solid",
		borderColor: "typo.100",
	},
})

const primaryError = definePartsStyle({
	field: {
		color: 'danger.400',
		bgColor: 'white',
		border: '1px',
		borderType: "solid",
		borderColor: "danger.400",
	},
})

export const inputTheme = defineMultiStyleConfig({
	variants:{
		"primary": primary,
		"primary-error": primaryError
	}
 })
