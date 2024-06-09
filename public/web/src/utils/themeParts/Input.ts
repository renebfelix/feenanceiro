import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const {
	definePartsStyle,
	defineMultiStyleConfig
} = createMultiStyleConfigHelpers(inputAnatomy.keys)

const baseStyle = definePartsStyle({
	field: {
		color: 'typo.500',
		bgColor: 'white',
		border: '1px',
		borderType: "solid",
		borderColor: "typo.100"
	},
})

export const inputTheme = defineMultiStyleConfig({ baseStyle })
