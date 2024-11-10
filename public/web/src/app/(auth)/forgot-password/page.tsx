"use client";

import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Notification } from "@/components/Notification/Notification";
import { handleForgot } from "./handleForgot";
import { NotificationProps } from "@/components/Notification/Notification.types";

export default function ForgotPasswordPage(){
	const { register, handleSubmit, formState: {errors}, reset } = useForm();

	const [notification, setNotification] = useState<NotificationProps>({
		show: false,
		status: "loading",
		message: "",
		errorCode: 0,
		isSimple: false
	})

	const [loading, setLoading] = useState(false);

	return (
		<Flex
			flexDir={"column"}
			alignItems={"center"}
			gap={4}
		>
			<Text color={'typo.300'} textAlign={"center"}>
				Enviaremos um link para seu e-mail, para que você possa redefinir sua senha.
			</Text>

			{notification.show && (
				<Notification {...notification} />
			)}

			<Flex
				as="form"
				w={"full"}
				gap={4}
				minW={350}
				flexDirection={"column"}
				method="POST"
				onSubmit={handleSubmit(async (data, event) => {
					setLoading(true);
					setNotification({
						message: "",
						status: "loading",
						show: false,
						isSimple: false
					});

					let response = await handleForgot(data, event);

					if(response.ok){
						setNotification({
							message: "Enviamos um link para seu e-mail, por favor, verifique sua caixa de entrada.",
							status: "success",
							show: true,
							isSimple: true
						});

						reset();
					} else{
						setNotification({
							message: "Ocorreu um erro",
							status: "error",
							show: true,
							errorCode: 100,
							isSimple: false
						});
					}

					setLoading(false);
				})}
			>
				<Input
					type="text"
					{...register("email", { required: true })}
					placeholder="E-mail"
					autoComplete='off'
					variant={errors.email?.type === "required" ? "primary-error" : "primary"}
				/>

				<Button
					isLoading={loading}
					variant={"primary"}
					type="submit"
				>Redefinir</Button>
			</Flex>
		</Flex>
	)
}
