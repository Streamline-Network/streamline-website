import Link from "next/link";
import Nav from "./nav/nav";
import React from "react";
import header from "./header.module.scss";

export default function Header({}: HeaderProps) {
	return (
		<header className={header.header}>
			<Link href="/">Streamline SMP</Link>
			<Nav />
		</header>
	);
}

interface HeaderProps {}
