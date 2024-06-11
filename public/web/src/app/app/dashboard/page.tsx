"use client";

import { getFetch } from "@/app/services/getFetch";
import { useMainContext } from "@feenanceiro/context";
import { useEffect } from "react";

export default function DashboardPage(){
	const { user, setUser, start, setStart } = useMainContext();

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

	return <h1>Dashboard - {start.isLoading ? "Carrgando..." : `Olá, ${user.fullnameUser}`}</h1>;
}
