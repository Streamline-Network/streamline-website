import classnames from "classnames";

import banner from "./banner.module.scss";

export default function Banner({ title, message, color }: BannerProps) {
	return (
		<div className={classnames(banner.notification, color)}>
			{title && <>
				<span className={banner.title}>{title}:</span>{" "}
			</>}
			{message}
		</div>
	);
}

export interface BannerProps {
	title?: string;
	message: string;
	color?: string;
}
