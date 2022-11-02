import classnames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import style from './header.module.scss';

export default function Header({ }: HeaderProps) {
	const pages = [
		['Home', '/'],
		['Community', '/community'],
		['About', '/about'],
		['Join', '/join'],
	];

	const path = usePathname();

	return (
		<header className={style.header}>
			<Link href="/">Streamline SMP</Link>
			<nav role="navigation">
				<span></span>
				<span></span>
				<span></span>
				<ul>
					{pages.map(([name, url], i) => (
						<li
							key={i}
							className={classnames({ [style.currentPg]: url === path })}
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
