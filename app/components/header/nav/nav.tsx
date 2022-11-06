"use client";

import Link from "next/link";
import React from "react";
import classnames from "classnames";
import header from "../header.module.scss";
import { usePathname } from "next/navigation";

export default function Nav({}: NavProps) {
	const pages = [
		["Home", "/"],
		["Community", "/community"],
		["About", "/about"],
		["Join", "/join"],
	];

	const path = usePathname();
	const [isOpen, setIsOpen] = React.useState(false);
	const toggle = () => {
		setIsOpen((isOpen) => !isOpen);

		if (document && isOpen) document.body.style.overflow = "";
		if (document && !isOpen) document.body.style.overflow = "hidden";
	};

	const close = () => {
		if (document) document.body.style.overflow = "";
		setIsOpen(false);
	};

	return (
		<>
			<Link onClick={close} href="/">
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
							<Link onClick={close} href={url}>
								{name}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</>
	);
}

interface NavProps {}
