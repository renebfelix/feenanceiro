"use client";
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Skeleton, useToast } from "@chakra-ui/react";
import { useMainContext } from "@feenanceiro/context";
import { Controller, useForm } from "react-hook-form";
import { ErrorLabel } from "@/components/ErrorLabel/ErrorLabel";
import { useEffect, useRef } from "react";
import { EmptySpace } from "../../components/EmptySpace/EmptySpace";
import { getFetch } from "@/app/services/fetchs";
import { CurrencyInput } from "react-currency-mask";

export default function SettingsAccountPage(){
	const { user, setUser } = useMainContext();
	const { control, register, handleSubmit, formState: { errors }, setValue } = useForm();

	useEffect(() => {
		setValue("fullname", user.data.fullname)
		setValue("username", user.data.username)
		setValue("email", user.data.email)

		if (user.data.limit) {
			setValue("limit", user.data.limit)
		}
	}, [user])

	if (user.status.isLoading) {
		return (
			<Skeleton width={"100%"} height={300}></Skeleton>
		)
	}

	if (user.status.hasError) {
		return (
			<EmptySpace variant="DANGER" decription="Ocorreu um erro. Tente novamente" />
		)
	}

	return (
		<Box as="form" onSubmit={handleSubmit(async (data, event) => {
			setUser({
				data: user.data,
				status: {
					...user.status,
					isLoading: true,
				},
			});

			const response = await getFetch({
				method: "PUT",
				url: "/app/user",
				data: data
			});

			if (response.error) {
				setUser({
					data: user.data,
					status: {
						...user.status,
						hasError: true,
					},
				});
			} else {
				setUser({
					data: response.data,
					status: user.status,
				});
			}
		})}>
			<Heading variant={"h2"} mb={5}>Informações pessoais</Heading>

			<FormControl mb={3}>
				<FormLabel>Nome:</FormLabel>
				<Input
					type="text"
					{...register("fullname", {
						required: {
							value: true,
							message: "Campo obrigatório"
						}
					})}
				/>

				{errors.fullname && <ErrorLabel errors={errors.fullname} />}
			</FormControl>

			<FormControl mb={3}>
				<FormLabel>Nome de usuário:</FormLabel>
				<Input
					disabled
					type="text"
					{...register("username", {
						disabled: true,
						required: {
							value: true,
							message: "Campo obrigatório"
						}
					})}
				/>

				{errors.username && <ErrorLabel errors={errors.username} />}
			</FormControl>

			<FormControl mb={3}>
				<FormLabel>E-mail:</FormLabel>
				<Input
					disabled
					type="text"
					{...register("email", {
						disabled: true,
						required: {
							value: true,
							message: "Campo obrigatório"
						}
					})}
				/>

				{errors.email && <ErrorLabel errors={errors.email} />}
			</FormControl>

			<FormControl mb={3}>
				<FormLabel>Limite de gastos:</FormLabel>
				<Controller
					name="limit"
					control={control}
					rules={{
						required: {
							value: true,
							message: "Campo obrigatório"
						}
					}}
					render={({field}) => (
						<CurrencyInput
							value={field.value}
							InputElement={
								<Input type="text" {...field} />
							}
							onChangeValue={(_: any, value: any) => {
								field.onChange(value);
							}}
						></CurrencyInput>
					)}
				/>
				{errors.value && <ErrorLabel errors={errors.value} />}
			</FormControl>

			<Flex mt={4} justifyContent={"flex-end"}>
				<Button type="submit" variant="primary">Salvar</Button>
			</Flex>
		</Box>
	)
}
