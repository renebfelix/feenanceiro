import React from "react";

export function Header({children}: {children: React.ReactNode}){
	return <header style={{background: "red", height: "150px"}}>{children}</header>
}
