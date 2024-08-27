"use client";
import { Notification } from "@/components/Notification/Notification";
import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import type { AlertStatus } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { handleCreateAccount } from "./handleCreateAccount";
import { useRouter } from "next/navigation";
import { useGoogleReCaptcha } from "react-google-recaptcha-hook";
import { verifyRecaptcha } from "@/services/verifyRecaptcha";

export default function CreateAccountPage(){
	const { register, handleSubmit, formState: { errors }, reset } = useForm();
	const { executeGoogleReCaptcha } = useGoogleReCaptcha(`${process.env.RECAPTCHA_KEY}`, {
		hide: true
	});

	const router = useRouter();
	const [notification, setNotification] = useState<{
		show: boolean;
		status: AlertStatus;
		message: string;
		errorCode?: number;
	}>({
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
			<Heading variant={"h1"} as={"h1"}>Cadastre-se</Heading>

			<Text color={'typo.300'} textAlign={"center"}>
				Preencha o formulário abaixo para criar sua conta. Depois dessa etapa, você já conseguirá controlar suas finanças.
			</Text>

			{notification.show && (
				<Notification status={notification.status} message={notification.message} error={notification.errorCode} />
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
						show: false,
						message: "",
						status: "loading",
					})

					const tokenCaptcha = await executeGoogleReCaptcha("execute");
					const verifyCaptcha = await verifyRecaptcha(tokenCaptcha);

					if (verifyCaptcha.success){
						const response = await handleCreateAccount(data, event);
						const dataResponse = await response.json();

						if (response.status === 201){
							setNotification({
								show: true,
								message: dataResponse.message,
								status: "success",
							})

							setTimeout(() => {
								router.push('/login');
							}, 2500);

							reset();
						} else {
							setNotification({
								show: true,
								message: dataResponse.message ?? "Ocorreu um erro",
								status: "error",
								errorCode: dataResponse.code ?? 100
							})
						}
					} else {
						setNotification({
							show: true,
							message: "Captcha inválido",
							status: "error",
							errorCode: 100
						})
					}

					setLoading(false);
				})}
			>
				<Input
					variant={errors.fullname?.type === "required" ? "primary-error" : "primary"}
					placeholder="Nome completo"
					autoComplete='off'
					{...register("fullname", { required: true })}
				/>

				<Input
					variant={errors.username?.type === "required" ? "primary-error" : "primary"}
					placeholder="Nome de @usuario"
					autoComplete='off'
					{...register("username", { required: true })}
				/>

				<Input
					type="email"
					variant={errors.email?.type === "required" ? "primary-error" : "primary"}
					placeholder="E-mail"
					autoComplete='off'
					{...register("email", { required: true })}
				/>

				<Input
					type="password"
					variant={errors.password?.type === "required" ? "primary-error" : "primary"}
					placeholder="Senha"
					autoComplete='off'
					{...register("password", { required: true })}
				/>

				<Input
					type="password"
					variant={errors.confirmPassword?.type === "required" ? "primary-error" : "primary"}
					placeholder="Confirmação de senha"
					autoComplete='off'
					{...register("confirmPassword", { required: true })}
				/>

				<Button
					isLoading={loading}
					type="submit"
					variant={"primary"}
				>Criar conta</Button>
			</Flex>

			<Link href={"/login"}>Já possui conta?</Link>
		</Flex>
	)
}
