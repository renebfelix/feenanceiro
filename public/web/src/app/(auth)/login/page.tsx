"use client";

import { Notification } from "@/components/Notification/Notification";
import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import Link from "next/link";
import { handleLogin } from "./handleLogin";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { NotificationProps } from "@/components/Notification/Notification.types";

export default function LoginPage(){
	const { register, handleSubmit, formState: {errors}, reset } = useForm();
	const router = useRouter();

	const [notification, setNotification] = useState<NotificationProps>({
		show: false,
		status: "loading",
		message: "",
		errorCode: 0
	})

	const [loading, setLoading] = useState(false);

	return (
		<Flex
			flexDir={"column"}
			alignItems={"center"}
			gap={4}
		>
			<Heading variant={"h1"} as={"h1"}>Entrar</Heading>

			<Text color={'typo.300'} textAlign={"center"}>
				Preencha o formulário abaixo com seus dados para acessar a plataforma.
			</Text>

			{notification.show && (
				<Notification {...notification} />
			)}

			<Flex
				as="form"
				w={"full"}
				gap={4}
				flexDirection={"column"}
				method="POST"
				onSubmit={handleSubmit(async (data, event) => {
					setLoading(true);
					setNotification({
						message: "",
						status: "loading",
						show: false,
					});

					let response = await handleLogin(data, event);

					if(response.token){
						setNotification({
							message: "Você será redirecionado",
							status: "success",
							show: true,
						});

						reset();
						router.push('/app/dashboard');
					} else{
						setNotification({
							message: response.message ?? "Ocorreu um erro",
							status: "error",
							show: true,
							errorCode: response.code ?? 100,
						});

						setLoading(false);
					}
				})}
			>
				<Input
					type="text"
					{...register("username", { required: true })}
					placeholder="E-mail ou usuário"
					autoComplete='off'
					variant={errors.username?.type === "required" ? "primary-error" : "primary"}
				/>

				<Input
					type="password"
					{...register("password", { required: true })}
					placeholder="Senha"
					autoComplete='off'
					variant={errors.password?.type === "required" ? "primary-error" : "primary"}
				/>

				<Box textAlign={"right"}>
					<Link href={"/forgot-password"}>Esqueci minha senha</Link>
				</Box>

				<Button
					isLoading={loading}
					variant={"primary"}
					type="submit"
				>Acessar conta</Button>
			</Flex>

			<Link href={"/create-account"}>Cadastre-se</Link>
		</Flex>
	)
}
