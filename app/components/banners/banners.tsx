"use client";

import Banner, { BannerProps } from "./banner/banner";

import banners from "./banners.json";
import { useState } from "react";

export default function Banners() {
	type Messages = Omit<BannerProps, "close" | "index">[];

	const lsKey = "closedBannerIds";

	const existing = banners.map(({ id }) => id);
	const closed: string[] = JSON.parse(localStorage.getItem(lsKey) ?? "[]");
	const existingClosed = closed.filter((id) => existing.includes(id));
	const bannersToDisplay = banners.filter((banner) => !closed.includes(banner.id));

	const [messages, setMessages] = useState<Messages>(bannersToDisplay);

	const close = (id: string) => {
		setMessages((messages) => [...messages.filter((message) => message.id !== id)]);
		localStorage.setItem(lsKey, JSON.stringify([...existingClosed, id]));
	};

	return (
		<>
			{messages.map((message, index) => (
				<Banner key={index} {...message} close={close} />
			))}
		</>
	);
}
