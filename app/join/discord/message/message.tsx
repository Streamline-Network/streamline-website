import classnames from "classnames";
import Image, { StaticImageData } from "next/image";
import React from "react";

export default function DiscordMessage({ at, mentioned, message, from: { profilePicture, username } }: DiscordMessageProps) {
	return (
		<div className={classnames("disc-message", { "disc-accepted": mentioned })}>
			<Image className="disc-account" src={profilePicture} alt={`Profile picture for ${username}`} width={50} height={50} />
			<div className="disc-message-text">
				<div className="disc-top-text">
					<p>{username}</p>
					<p>{at}</p>
				</div>
				<div className="disc-btm-text">
					<p>{message}</p>
				</div>
			</div>
		</div>
	);
}

export interface DiscordMessageProps {
	from: {
		username: string;
		profilePicture: StaticImageData;
	};
	at: string;
	mentioned: boolean;
	message: React.ReactNode;
}
