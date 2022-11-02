import classnames from "classnames";
import Link from "next/link";
import React from "react";

import footer from "./footer.module.scss";

export default function Footer({ }: FooterProps) {
	const links: [text: string, href: string, button: boolean][] = [
		["Map", "http://map.streamlinesmp.com", true],
		["Stats", "http://stats.streamlinesmp.com", true],
		["Donate", "/donate", false],
		["Contact Us", "/contact", false],
	];

	return (
		<footer className={footer.footer}>
			<p>© {new Date().getFullYear()} All Rights Reserved</p>
			<nav>
				{links.map(([text, href, isBtn], i) => (
					<Link
						key={i}
						href={href}
						className={classnames({
							button: isBtn,
							[footer.button]: isBtn,
						})}
					>
						{text}
					</Link>
				))}
			</nav>
		</footer>
	);
}

interface FooterProps { }
