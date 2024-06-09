import { Button } from "@chakra-ui/react";
import Link from "next/link";

export default function LoginPage(){
	return (
		<>
			<h2>Login</h2>
			<Button isLoading variant={"danger"}>Botão</Button>

			<Link href={"/forgot-password"}>Esqueci minha senha</Link>
			<Link href={"/create-account"}>Cadastre-se</Link>
		</>
	)
}
