import { signOut, useSession } from "next-auth/react";

import Link from "next/link";
import dropdown from "./dropdown.module.scss";

export default function Dropdown() {
	const createItems = () => {
		const items = [
			{ name: "Check Application Status", link: "/apply" },
			{ name: "Settings", link: "/settings" },
		];

		return items.map((item, index) => {
			return (
				<li key={index}>
					<Link className={dropdown.button} href={item.link}>
						{item.name}
					</Link>
				</li>
			);
		});
	};

	return (
		<nav className={dropdown.dropdown}>
			<ul>
				{createItems()}
				<li>
					<a className={dropdown.button} onClick={() => signOut()}>
						Logout
					</a>
				</li>
			</ul>
		</nav>
	);
}
