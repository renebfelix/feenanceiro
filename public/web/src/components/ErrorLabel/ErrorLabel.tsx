import { Text } from "@chakra-ui/react";
import { FieldValues } from "react-hook-form";

export function ErrorLabel(params: { errors: FieldValues }){

	return (
		<Text variant={"error"}>
			{ params.errors.root ? params.errors.root.message : params.errors.message }
		</Text>
	)
}
