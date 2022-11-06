"use client";

import classnames from "classnames";
import Image from "next/image";

import banner from "./banner.module.scss";
import closeIcon from "./images/close.png";

export default function Banner({ title, message, color, close, id }: BannerProps) {
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
			<button onClick={() => close(id)}>
				<Image src={closeIcon} alt="Close icon" width={25} />
			</button>
		</div>
	);
}

export interface BannerProps {
	title?: string;
	message: string;
	color?: string;
	close: (id: string) => void;
	id: string;
}
