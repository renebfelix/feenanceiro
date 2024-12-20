import React, { Suspense } from "react";
import { LayoutAuth } from "./components/Layout";

export default function AuthLayoutRoot({children}: Readonly<{children: React.ReactNode}>){
	return <LayoutAuth><Suspense>{children}</Suspense></LayoutAuth>
}
