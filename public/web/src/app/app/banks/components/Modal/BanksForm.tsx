import { ErrorLabel } from "@/components/ErrorLabel/ErrorLabel";
import { Box, Button, FormControl, FormLabel, Input, ModalBody, ModalFooter } from "@chakra-ui/react";
import { useMainContext } from "@feenanceiro/context";
import { BanksProps } from "@feenanceiro/types";
import { useForm } from "react-hook-form";

export function BanksForm(params: Readonly<{ edit?: BanksProps }>){
	const {} = useMainContext();
	const { handleSubmit, register, formState: { errors } } = useForm();

	return (
		<Box
			as="form"
			onSubmit={handleSubmit((data, event) => {
				console.log(data);
			})}
		>
			<ModalBody>
				<FormControl mb={3}>
					<FormLabel>Nome do cartão:</FormLabel>
					<Input
						type="text"
						{...register("name", {
							required: {
								value: true,
								message: "Campo obrigatório"
							}
						})}
					/>
					{errors.name && <ErrorLabel errors={errors.name} />}
				</FormControl>
			</ModalBody>

			<ModalFooter borderTop={"1px solid"} borderTopColor={"neutral.100"} gap={3}>
				<Button type="button">Cancelar</Button>
				<Button type="submit" variant={"primary"}>
					{params.edit ? "Editar" : "Cadastrar"}
				</Button>
			</ModalFooter>
		</Box>
	)
}
