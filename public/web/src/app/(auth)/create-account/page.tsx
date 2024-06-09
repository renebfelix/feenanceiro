"use client";
import { Notification } from "@/components/Notification/Notification";
import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function CreateAccountPage(){
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

			<Notification status="success" message="Você será redirecionado..." error={2} />

			<Flex as="form" w={"full"} gap={4} flexDirection={"column"} method="POST">
				<Input
					variant={"primary"}
					placeholder="Nome completo"
					autoComplete='off'
					isRequired
				/>

				<Input
					variant={"primary"}
					placeholder="Nome de @usuario"
					autoComplete='off'
					isRequired
				/>

				<Input
					variant={"primary"}
					placeholder="E-mail"
					autoComplete='off'
					isRequired
					type="email"
				/>

				<Input
					variant={"primary"}
					placeholder="Senha"
					autoComplete='off'
					isRequired
				/>

				<Input
					variant={"primary"}
					placeholder="Confirmação de senha"
					autoComplete='off'
					isRequired
				/>

				<Button type="submit" variant={"primary"}>Criar conta</Button>
			</Flex>

			<Link href={"/login"}>Já possui conta?</Link>
		</Flex>
	)
}
