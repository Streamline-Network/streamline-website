"use client";

import Image from "next/image";
import banner from "./banner.module.scss";
import classnames from "classnames";
import closeIcon from "./images/close.png";

export default function Banner({ title, message, color, close }: BannerProps) {
	return (
		<div className={classnames(banner.notification, color)}>
			<span>
				{title && (
					<>
						<span className={banner.title}>{title}:</span>{" "}
					</>
				)}
				{message}
			</span>
			<button onClick={close}>
				<Image src={closeIcon} alt="Close icon" width={25} />
			</button>
		</div>
	);
}

export interface BannerProps {
	title?: string;
	message: string;
	color?: string;
	close: () => void;
}
