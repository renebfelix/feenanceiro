import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ChakraThemeEdit } from "./chakraProviderTheme";

const roboto = Roboto({ weight: ["300", "400", "500", "700", "900"], subsets: ["latin"] });

export const metadata: Metadata = {
	title: 'Feenanceiro - Controle financeiro',
	description: 'Controle financeiro grátis, fácil e completo para sua vida.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-br">
			<body className={roboto.className}>
				<ChakraThemeEdit>
					{children}
				</ChakraThemeEdit>
			</body>
		</html>
	);
}
