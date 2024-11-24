import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

function disabledConfig(bgColor: string, hoverColor: string){
	return {
		bg: bgColor,
		color: "white",
		_disabled: {
			bgColor: "neutral.500",
		},
		_hover: {
			bgColor: hoverColor,
			_disabled: {
				bgColor: "neutral.500",
			},
		},
	}
}

const primary = defineStyle({
	...disabledConfig("primary.400", 'primary.500'),
})

const secundary = defineStyle({
	...disabledConfig("secundary.400", 'secundary.500'),
})

const danger = defineStyle({
	...disabledConfig("danger.400", 'danger.500'),
})

const success = defineStyle({
	...disabledConfig("success.400", 'success.500'),
})

const warning = defineStyle({
	...disabledConfig("warning.400", 'warning.500'),
})

const ghost = defineStyle({
	...disabledConfig("white", 'primary.500'),
	color: "primary.500",
	bgColor: "white",
	_hover: {
		color: "white",
		bgColor: "primary.500"
	}
})

export const buttonTheme = defineStyleConfig({
  variants: {
	"primary": primary,
	"secundary": secundary,
	"danger": danger,
	"success": success,
	"warning": warning,
	"ghost": ghost,
   },
})
