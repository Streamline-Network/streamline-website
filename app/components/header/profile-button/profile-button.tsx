"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import Dropdown from "./dropdown/dropdown";
import Image from "next/image";
import profileButton from "./profile-button.module.scss";
import profilePlaceholder from "./images/profile-placeholder.webp";

export default function ProfileButton({}: ProfileButtonProps) {
	const { data: session } = useSession();
	// const session = true;
	const [isClicked, setClicked] = useState(false);

	const handleClick = () => {
		setClicked(!isClicked);
	};

	return (
		<li>
			{session ? (
				<>
					<Image
						src={session.user?.image || profilePlaceholder}
						className={profileButton.profileImg}
						alt="Profile Placeholder"
						width={30}
						height={30}
						onClick={() => handleClick()}
					/>
					<a onClick={() => signIn("discord")} className={profileButton.profileButton}>
						Account
					</a>
					{isClicked ? <Dropdown /> : null}
				</>
			) : (
				<a onClick={() => signIn("discord")} className={profileButton.loginButton}>
					Login
				</a>
			)}
		</li>
	);
}

interface ProfileButtonProps {}
