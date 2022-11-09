"use client";

import { signIn, signOut, useSession } from "next-auth/react";

import Image from "next/image";
import profileButton from "./profile-button.module.scss";
import profilePlaceholder from "./images/profile-placeholder.webp";

export default function ProfileButton({}: ProfileButtonProps) {
	const { data: session } = useSession();
	// const session = true;
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
						onClick={() => signOut()}
					/>
					<a onClick={() => signIn("discord")} className={profileButton.profileButton}>
						Account
					</a>
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
