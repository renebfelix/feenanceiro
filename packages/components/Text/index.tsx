import React from "react";

interface TextProps {
	children: React.ReactNode,
	variante: string;
}

export function Text({children}: TextProps){
	return <h1 style={{background: "red"}}>{children}</h1>
}
