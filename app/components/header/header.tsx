"use client";

import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { MouseEvent } from "react";

import header from "./header.module.scss";

export default function Header({ }: HeaderProps) {
	const pages = [
		["Home", "/"],
		["Community", "/community"],
		["About", "/about"],
		["Join", "/join"],
	];

	const path = usePathname();
	const [isOpen, setIsOpen] = React.useState(false);
	const toggle = (_event?: MouseEvent, close?: true) => {
		setIsOpen((isOpen) => {
			document && (document.body.style.overflow = (document && isOpen) ? "" : "hidden"); // TODO: use CSS :has() selector
			return close ? false : !isOpen;
		});
	};

	return (
		<header className={header.header}>
			<Link onClick={() => toggle(undefined, true)} href="/">
				Streamline SMP
			</Link>

			<nav className={classnames({ [header.open]: isOpen })}>
				<button onClick={toggle}>
					<span />
					<span />
					<span />
				</button>
				<ul>
					{pages.map(([name, url], i) => (
						<li key={i} className={classnames({ [header.currentPg]: url === path })}>
							<Link onClick={() => toggle(undefined, true)} href={url}>
								{name}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}

interface HeaderProps { }
