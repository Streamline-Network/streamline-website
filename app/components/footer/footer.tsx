import classnames from "classnames";
import Link from "next/link";
import React from "react";

import styles from "./footer.module.scss";

export default function Footer({}: FooterProps) {
	const links: [text: string, href: string, button: boolean][] = [
		["Map", "http://map.streamlinesmp.com", true],
		["Stats", "http://stats.streamlinesmp.com", true],
		["Donate", "/donate", false],
		["Contact Us", "/contact", false],
	];

	return (
		<footer className={styles.footer}>
			<p>© 2023 All Rights Reserved</p>
			<nav>
				{links.map(([text, href, isBtn], i) => (
					<Link
						key={i}
						href={href}
						className={classnames({
							button: isBtn,
							[styles.button]: isBtn,
						})}
					>
						{text}
					</Link>
				))}
			</nav>
		</footer>
	);
}

interface FooterProps {}
