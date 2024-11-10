"use client";

import { Avatar, Box, Button, Container, Flex, HStack, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { NavLink, NavLinkProps } from "../NavLink/NavLink";
import { FiCreditCard, FiLogOut, FiMenu, FiSettings, FiTag, FiUser, FiUsers, FiX } from "react-icons/fi";

import LogoFeenanceiro from "../../../../../public/logo-white.svg";
import Image from "next/image";
import Link from "next/link";
import { useMainContext } from "@feenanceiro/context";
import { BsBank } from "react-icons/bs";

import { useEffect } from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { MdOutlineAttachMoney } from "react-icons/md";

import {
	fetcResponsable,
	fetchBanks,
	fetchCards,
	fetchUser,
	fetchCategories
} from "@/app/services/fetchs";


export function HeaderApp(){
	const { user, setUser, setBanks, setCards, setCategories, setResponsables } = useMainContext();
	const router = useRouter();

	const { isOpen, onOpen, onClose } = useDisclosure();
	const Links: Array<NavLinkProps> = [
		{ title: "Lançamentos", href: "/app/bills", icon: <MdOutlineAttachMoney /> },
		{ title: "Responsáveis", href: "/app/responsables", icon: <FiUsers /> },
		{ title: "Cartões", href: "/app/cards", icon: <FiCreditCard /> },
		{ title: "Bancos", href: "/app/banks", icon: <BsBank /> },
		{ title: "Categorias", href: "/app/categories", icon: <FiTag /> },
	];

	function signOut(){
		Cookies.remove("token_fee", { path: '/', secure: true, sameSite: "none" })
		router.push('/login');
	}

	useEffect(() => {
		async function getUser(){
			const [
				cardsData,
				userData,
				responsablesData,
				banksData,
				categoriesData
			] = await Promise.all([
				fetchCards(),
				fetchUser(),
				fetcResponsable(),
				fetchBanks(),
				fetchCategories()
			]);

			setCards(cardsData);
			setUser(userData);
			setResponsables(responsablesData);
			setBanks(banksData);
			setCategories(categoriesData);
		}

		getUser();
	}, []);

	return (
		<Box bg={'primary.500'} px={4} position={"fixed"} w={"full"} minH={"60px"} zIndex={100}>
			<Container maxW='container.xl' w={"100%"}>
				<Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
					<IconButton
						size={'md'}
						icon={isOpen ? <FiX /> : <FiMenu />}
						aria-label={'Abrir menu'}
						display={{ base: 'flex', lg: 'none' }}
						onClick={isOpen ? onClose : onOpen}
						justifyContent={"center"}
						alignItems={"center"}
					/>

					<HStack spacing={8} alignItems={'center'}>
						<Box maxW={"150px"}>
							<Link href={"/app/dashboard"}>
								<Image src={LogoFeenanceiro} alt="Feenanceiro" />
							</Link>
						</Box>

						<HStack as={'nav'} spacing={1} display={{ base: 'none', lg: 'flex' }}>
							{Links.map((link, index) => (
								<NavLink icon={link.icon} href={link.href} key={link.title} title={link.title} />
							))}
						</HStack>
					</HStack>

					<Flex alignItems={'center'} gap={4}>
						<Text
							display={{ base: 'none', xl: 'flex' }}
							color={"white"}
						>
							{user.status.isLoading ? 'Carregando...' : user.data.fullname}
						</Text>

						<Menu>
							<MenuButton
								as={Button}
								rounded={'full'}
								variant={'link'}
								cursor={'pointer'}
								minW={0}
							>
								<Avatar
									size={'sm'}
									icon={user.status.isLoading ? <FiUser /> : undefined}
									name={!user.status.isLoading ? user.data.fullname : undefined}
								/>
							</MenuButton>

							<MenuList>
								<MenuItem onClick={() => router.push("/app/settings/account")} icon={<FiSettings />}>Configurações</MenuItem>
								<MenuDivider />
								<MenuItem icon={<FiLogOut />} onClick={() => signOut()}>Sair</MenuItem>
							</MenuList>
						</Menu>
					</Flex>
				</Flex>

				{isOpen ? (
					<Box pb={4} display={{ lg: 'none' }}>
						<Stack as={'nav'} spacing={4}>
							{Links.map((link, index) => (
								<NavLink icon={link.icon} href={link.href} key={link.title} title={link.title} />
							))}
						</Stack>
					</Box>
				) : null}

			</Container>
		</Box>
	)
}
