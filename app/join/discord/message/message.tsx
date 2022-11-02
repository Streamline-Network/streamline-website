import classnames from "classnames";
import Image, { StaticImageData } from "next/image";
import React from "react";

import message from "./message.module.scss";

export default function DiscordMessage({ at, mentioned, content, from: { profilePicture, username, color } }: DiscordMessageProps) {
	return (
		<div className={classnames(message.discMessage, { [message.discAccepted]: mentioned })}>
			<Image className={message.discAccount} src={profilePicture} alt={`Profile picture for ${username}`} width={50} height={50} />
			<div className={message.discMessageText}>
				<div className={message.discTopText}>
					<p style={{ color }}>{username}</p>
					<p>{at}</p>
				</div>
				<div className={message.discBtmText}>{content}</div>
			</div>
		</div>
	);
}

export interface DiscordMessageProps {
	from: {
		username: string;
		profilePicture: StaticImageData;
		color: string;
	};
	at: string;
	mentioned: boolean;
	content: React.ReactNode;
}
