"use client";
import NextLink from "next/link";
import { Button } from "@chakra-ui/react";
import { ReactElement } from "react";

export interface NavLinkProps {
	title: string;
	href: string;
	icon?: ReactElement;
}

export const NavLink = (props: NavLinkProps) => {
	const { title, href, icon } = props;

	return (
		<Button
			href={href}
			as={NextLink}
			leftIcon={icon}
			bgColor={"transparent"}
			color={"white"}
			_hover={{
				bgColor: "primary.200",
				color: "primary.500"
			}}
		>
			{title}
		</Button>
	)
}
