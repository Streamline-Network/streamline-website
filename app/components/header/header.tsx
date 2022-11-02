import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import header from "./header.module.scss";

export default function Header({ }: HeaderProps) {
	const pages = [
		["Home", "/"],
		["Community", "/community"],
		["About", "/about"],
		["Join", "/join"],
	];

	// const path = usePathname();
	const path = "";

	return (
		<header className={header.header}>
			<Link href="/">Streamline SMP</Link>
			<nav>
				<span></span>
				<span></span>
				<span></span>
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
			</nav>
		</header>
	);
}

interface HeaderProps { }
