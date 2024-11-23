"use client";
import { getFetch } from "@/app/services/fetchs";
import { ErrorLabel } from "@/components/ErrorLabel/ErrorLabel";
import { Box, Heading, FormControl, FormLabel, Input, Divider, Flex, Button, useToast } from "@chakra-ui/react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function PasswordSettings(){
	const { register, handleSubmit, reset, formState: { errors }, setError } = useForm();
	const toast = useToast();
  	const toastIdRef = useRef<any>();
	const router = useRouter();

	return (
		<Box as="form" onSubmit={handleSubmit(async (data, event) => {
			if (data.newPassword !== data.confirmNewPassword) {
				toastIdRef.current = toast({ description: "Senhas não coincidem", status: "error", position: "top-right", isClosable: true });
			} else {
				toastIdRef.current = toast({ description: 'Editando', position: "top-right", isClosable: true });

				const response = await getFetch({
					method: "PUT",
					url: '/app/user/password',
					data: {
						oldPassword: data.oldPassword,
						newPassword: data.newPassword
					},
				});

				if (response.error) {
					toastIdRef.current = toast({ description: response.error.message, status: "error", position: "top-right", isClosable: true });
				} else {
					toastIdRef.current = toast({ description: 'Senha alterada com sucesso!', status: "success", position: "top-right", isClosable: true });
					Cookies.remove("token_fee");
					router.push("/login");
				}
			}

		})}>
			<Heading variant={"h2"} mb={5}>Alterar senha</Heading>

			<FormControl mb={3}>
				<FormLabel>Senha atual:</FormLabel>
				<Input
					type="password"
					{...register("oldPassword", {
						required: {
							value: true,
							message: "Campo obrigatório"
						}
					})}
				/>

				{errors.password && <ErrorLabel errors={errors.password} />}
			</FormControl>

			<Divider my={5} />

			<FormControl mb={3}>
				<FormLabel>Nova senha:</FormLabel>
				<Input
					type="password"
					{...register("newPassword", {
						required: {
							value: true,
							message: "Campo obrigatório"
						}
					})}
				/>

				{errors.new_password && <ErrorLabel errors={errors.new_password} />}
			</FormControl>

			<FormControl mb={3}>
				<FormLabel>Confirme a nova senha:</FormLabel>
				<Input
					type="password"
					{...register("confirmNewPassword", {
						required: {
							value: true,
							message: "Campo obrigatório"
						}
					})}
				/>

				{errors.confirm_new_password && <ErrorLabel errors={errors.confirm_new_password} />}
			</FormControl>

			<Flex mt={4} justifyContent={"flex-end"}>
				<Button type="submit" variant="primary">Salvar</Button>
			</Flex>
		</Box>
	)
}
