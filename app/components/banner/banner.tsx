import banner from "./banner.module.scss";

export default function Banner({ title, message, color }: BannerProps) {
	return (
		<div className={banner.notification}>
			{
				title && <div>{title}</div>
			}
			{message}
		</div>
	);
}

export interface BannerProps {
	title?: string;
	message: string;
	color?: string;
}
