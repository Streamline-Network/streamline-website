"use client";

import classnames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import header from "./header.module.scss";
import hamburger from "./images/hamburger.png";

export default function Header({ }: HeaderProps) {
	const pages = [
		["Home", "/"],
		["Community", "/community"],
		["About", "/about"],
		["Join", "/join"],
	];

	const path = usePathname();
	const [isOpen, setIsOpen] = React.useState(false);
	const toggle = () => setIsOpen(isOpen => !isOpen);

	return (
		<header className={header.header}>
			<Link href="/">Streamline SMP</Link>
			<nav className={classnames({ [header.open]: isOpen })}>
				<ul>
					{pages.map(([name, url], i) => (
						<li
							key={i}
							className={classnames({ [header.currentPg]: url === path })}
						>
							<Link href={url}>{name}</Link>
						</li>
					))}
				</ul>
				<button onClick={toggle}>
					<Image src={hamburger} alt="Menu" width={40} />
				</button>
			</nav>
		</header>
	);
}

interface HeaderProps { }
