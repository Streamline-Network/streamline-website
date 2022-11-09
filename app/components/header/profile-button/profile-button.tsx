"use client";

import { signIn, signOut, useSession } from "next-auth/react";

import Image from "next/image";
import profileButton from "./profile-button.module.scss";
import profilePlaceholder from "./images/profile-placeholder.png";

export default function ProfileButton({}: ProfileButtonProps) {
	const { data: session } = useSession();

	return (
		<div className="profileButton">
			{session ? (
				<Image
					src={session.user?.image || profilePlaceholder}
					className={profileButton.profileImg}
					alt="Profile Placeholder"
					width={30}
					height={30}
					onClick={() => signOut()}
				/>
			) : (
				<div onClick={() => signIn("discord")} className={profileButton.loginButton}>
					Login
				</div>
			)}
		</div>
	);
}

interface ProfileButtonProps {}
