"use client";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import LogoFeenanceiro from "../../../../public/logo-primary-500.svg";
import Image from "next/image";
import Link from "next/link";

export default function PrivacyPage(){
	return (
		<Flex
			maxW={"900px"}
			bgColor={"white"}
			p={7}
			mx={"auto"}
			my={5}
			borderRadius={6}
			flexDirection={"column"}
			gap={"10px"}
		>
			<Box maxW={"40%"} mx={"auto"} mb={"40px"}>
				<Link href={"/"}>
					<Image alt="Feenanceiro" src={LogoFeenanceiro} />
				</Link>
			</Box>

			<Heading variant={"h1"}>Política de Privacidade</Heading>

			<Text>Esta Política de Privacidade descreve como o Feenanceiro coleta, usa e divulga suas informações pessoais quando você usa nosso site e os serviços relacionados.</Text>

			<Heading variant={"h2"}>Informações que Coletamos</Heading>

			<Heading variant={"h3"}>Coletamos as seguintes categorias de informações pessoais:</Heading>

			<Text><strong>Informações de Cadastro:</strong> Quando você cria uma conta em nosso site, coletamos informações como seu nome, endereço de e-mail e senha.</Text>

			<Text><strong>Informações de Uso:</strong> Quando você usa nossos Serviços, coletamos informações sobre sua atividade, como as páginas que você visita, as transações que você registra e as ferramentas que você usa.</Text>

			<Text><strong>Informações do Dispositivo:</strong> Coletamos informações sobre o dispositivo que você usa para acessar nossos Serviços, como o tipo de dispositivo, o sistema operacional e o endereço IP.</Text>

			<Text><strong>Informações de Cookies e Rastreamento:</strong> Usamos cookies e outras tecnologias de rastreamento para coletar informações sobre sua atividade em nosso site.</Text>

			<Heading variant={"h2"}>Como Usamos suas Informações</Heading>

			<Heading variant={"h3"}>Usamos suas informações pessoais para os seguintes fins:</Heading>

			<Text><strong>Fornecer e melhorar nossos Serviços:</strong> Usamos suas informações para fornecer e melhorar nossos Serviços, incluindo a personalização de sua experiência.</Text>

			<Text><strong>Comunicar-se com você:</strong> Usamos suas informações para comunicar-se com você sobre sua conta, nossos Serviços e outras informações que podem ser do seu interesse.</Text>

			<Text><strong>Proteger nossos direitos:</strong> Usamos suas informações para proteger nossos direitos e os direitos de terceiros, incluindo a prevenção de fraude e abuso.</Text>

			<Text><strong>Cumprir a lei:</strong> Usamos suas informações para cumprir a lei, regulamentos e solicitações legais.</Text>

			<Heading variant={"h2"}>Compartilhamento de suas Informações</Heading>

			<Heading variant={"h3"}>Podemos compartilhar suas informações pessoais com terceiros nas seguintes circunstâncias:</Heading>

			<Text><strong>Com seu consentimento:</strong> Podemos compartilhar suas informações com terceiros se você consentir.</Text>

			<Text><strong>Com provedores de serviços:</strong> Podemos compartilhar suas informações com provedores de serviços que nos ajudam a operar nossos Serviços, como provedores de processamento de pagamentos e provedores de análise.</Text>

			<Text><strong>Com autoridades legais:</strong> Podemos compartilhar suas informações com autoridades legais se formos obrigados a fazê-lo por lei ou se acreditarmos de boa fé que tal ação seja necessária para proteger nossos direitos ou os direitos de terceiros.</Text>

			<Heading variant={"h2"}>Suas Escolhas</Heading>

			<Heading variant={"h3"}>Você tem as seguintes opções em relação às suas informações pessoais:</Heading>

			<Text><strong>Acesso e correção:</strong> Você pode acessar e corrigir suas informações pessoais entrando em contato conosco.</Text>

			<Text><strong>Exclusão:</strong> Você pode solicitar que excluamos suas informações pessoais entrando em contato conosco.</Text>

			<Text><strong>Cancelamento da assinatura:</strong> Você pode cancelar a assinatura de nossas comunicações de marketing a qualquer momento clicando no link de cancelamento de assinatura em qualquer email que você receber de nós.</Text>

			<Heading variant={"h2"}>Segurança de suas Informações</Heading>

			<Text>Tomamos medidas de segurança técnicas e organizacionais para proteger suas informações pessoais contra acesso, uso, divulgação, alteração ou destruição não autorizados.</Text>

			<Heading variant={"h2"}>Mudanças nesta Política</Heading>

			<Text>Podemos atualizar esta Política de tempos em tempos. Notificaremos você sobre qualquer alteração material nesta Política por meio de email ou publicando a Política revisada em nosso site.</Text>

			<Heading variant={"h2"}>Contato</Heading>

			<Text>Se você tiver alguma dúvida sobre esta Política, entre em contato conosco em <a href="mailto:feenanceiro@feenanceiro.com.br">feenanceiro@feenanceiro.com.br</a></Text>
		</Flex>
	)
}
