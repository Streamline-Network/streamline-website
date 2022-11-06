import Nav from "./nav/nav";
import React from "react";
import header from "./header.module.scss";

export default function Header({}: HeaderProps) {
	return (
		<header className={header.header}>
			<Nav />
		</header>
	);
}

interface HeaderProps {}
