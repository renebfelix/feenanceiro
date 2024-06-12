"use client";

import { Avatar, Box, Button, Container, Flex, HStack, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { NavLink, NavLinkProps } from "../NavLink/NavLink";
import { FiCreditCard, FiGrid, FiLock, FiLogOut, FiMenu, FiSettings, FiTag, FiUser, FiUsers, FiX } from "react-icons/fi";

import LogoFeenanceiro from "../../../../../public/logo-white.svg";
import Image from "next/image";
import Link from "next/link";
import { useMainContext } from "@feenanceiro/context";
import { BsBank } from "react-icons/bs";

import { getFetch } from "@/app/services/getFetch";
import { useEffect } from "react";

export function HeaderApp(){
	const { user, start, setStart, setUser } = useMainContext();

	const { isOpen, onOpen, onClose } = useDisclosure();
	const Links: Array<NavLinkProps> = [
		{ title: "Responsáveis", href: "/app/responsables", icon: <FiUsers /> },
		{ title: "Cartões", href: "/app/cards", icon: <FiCreditCard /> },
		{ title: "Bancos", href: "/app/banks", icon: <BsBank /> },
		{ title: "Categorias", href: "/app/categories", icon: <FiTag /> },
	];

	useEffect(() => {
		async function getUser(){
			const userData = await getFetch({method: "GET", url: '/app/user'});

			setUser(userData);
			setStart({
				hasError: false,
				isLoading: false
			})
		}

		getUser();
	}, []);

	return (
		<Box bg={'primary.500'} px={4} position={"fixed"} w={"full"} minH={"60px"}>
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
							display={{ base: 'none', md: 'flex' }}
							color={"white"}
						>
							{start.isLoading ? 'Carregando...' : user.fullnameUser}
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
									icon={start.isLoading ? <FiUser /> : undefined}
									name={!start.isLoading ? user.fullnameUser : undefined}
								/>
							</MenuButton>

							<MenuList>
								<MenuItem icon={<FiSettings />}>Configurações</MenuItem>
								<MenuItem icon={<FiLock />}>Alterar senha</MenuItem>
								<MenuDivider />
								<MenuItem icon={<FiLogOut />}>Sair</MenuItem>
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