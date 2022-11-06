"use client";

import Banner, { BannerProps } from "./banner/banner";

import banners from "./banners.json";
import { useState } from "react";

export default function Banners() {
	type Messages = Omit<BannerProps, "close" | "index">[];
	const lsKey = "closedBannerIds";

	const lsAccess = (setting?: boolean, item?: string[]) => {
		if (!window) return [];
		if (setting) {
			localStorage.setItem(lsKey, JSON.stringify(item));
		} else {
			return JSON.parse(localStorage.getItem(lsKey) || "[]");
		}
	};

	const existing = banners.map(({ id }) => id);
	const closed: string[] = lsAccess();
	const existingClosed = closed.filter((id) => existing.includes(id));
	const bannersToDisplay = banners.filter((banner) => !closed.includes(banner.id));

	const [messages, setMessages] = useState<Messages>(bannersToDisplay);

	const close = (id: string) => {
		setMessages((messages) => [...messages.filter((message) => message.id !== id)]);
		lsAccess(true, [...existingClosed, id]);
	};

	return (
		<>
			{messages.map((message, index) => (
				<Banner key={index} {...message} close={close} />
			))}
		</>
	);
}
