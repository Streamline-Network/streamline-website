"use client";

import Banner, { BannerProps } from "./banner/banner";

export default function Banners() {
	const close = () => {
		console.log("Close");
	};

	const messages: Omit<BannerProps, "close">[] = [
		{
			message:
				"We are currently in between seasons and are not accepting new people. Season 4 releases November the 11th!",
		},
	];
	return (
		<>
			{messages.map((message, index) => (
				<Banner key={index} {...message} close={close} />
			))}
		</>
	);
}
