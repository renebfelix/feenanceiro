import { Notification } from "@/components/Notification/Notification";
import { NotificationProps } from "@/components/Notification/Notification.types";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { handleNewPassword } from "../handleNewPassword";
import { useRouter, useSearchParams } from "next/navigation";

export function SuccessReset(){
	const searchParams = useSearchParams();
	const router = useRouter();
	const { register, handleSubmit, formState: {errors}, reset } = useForm();

	const email = searchParams?.get('email') ?? undefined;
	const uuid = searchParams?.get('uuid') ?? undefined;

	const [notification, setNotification] = useState<NotificationProps>({
		show: false,
		status: "loading",
		message: "",
		errorCode: 0,
		isSimple: false
	})

	const [loading, setLoading] = useState(false);

	return (
		<>
			<Text color={'typo.300'} textAlign={"center"}>
				Digite sua nova senha
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

					if (data.password !== data.confirmPassword) {
						setNotification({
							message: "As senhas precisam ser idênticas.",
							status: "error",
							show: true,
							isSimple: true
						});
					} else {
						let response = await handleNewPassword(data, event, uuid, email);

						if(response.ok){
							setNotification({
								message: "Senha alterada com sucesso",
								status: "success",
								show: true,
								isSimple: false
							});

							reset();
							router.push('/login');
						} else{
							setNotification({
								message: "Ocorreu um erro",
								status: "error",
								show: true,
								errorCode: 100,
								isSimple: false
							});
						}
					}

					setLoading(false);
				})}
			>
				<Input
					type="password"
					{...register("password", { required: true })}
					placeholder="Senha"
					autoComplete='off'
					variant={errors.password?.type === "required" ? "primary-error" : "primary"}
				/>

				<Input
					type="password"
					{...register("confirmPassword", { required: true })}
					placeholder="Confirme sua senha"
					autoComplete='off'
					variant={errors.confirmPassword?.type === "required" ? "primary-error" : "primary"}
				/>

				<Button
					isLoading={loading}
					variant={"primary"}
					type="submit"
				>Redefinir</Button>
			</Flex>
		</>
	)
}
