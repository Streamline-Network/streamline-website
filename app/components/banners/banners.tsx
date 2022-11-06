"use client";

import { useState } from "react";

import Banner, { BannerProps } from "./banner/banner";
import banners from "./banners.module.scss";

export default function Banners() {
	type Messages = Omit<BannerProps, "close" | "index">[];

	const [messages, setMessages] = useState<Messages>([
		{
			message: "We are currently in between seasons and are not accepting new people. Season 4 releases November the 11th!",
			id: "in-between-seasons-3-4",
		},
		{
			message: "Eiusmod officia sunt enim elit sint amet aliquip.",
			id: "Occaecat",
		},
		{
			message: "Minim in proident ad aliquip est ad adipisicing dolore.",
			id: "Nulla",
		},
		{
			message: "Aliquip non proident quis id qui cupidatat mollit ea sunt in minim aute tempor.",
			id: "Mollit",
		},
		{
			message: "Ea officia cupidatat pariatur irure laboris exercitation anim.",
			id: "Eiusmod",
		},
		{
			message: "Exercitation sunt velit in labore voluptate sit minim dolor laborum ipsum qui.",
			id: "Enim",
		},
		{
			message: "Laboris ex incididunt quis magna exercitation ex labore adipisicing.",
			id: "Eiusmod2",
		},
	]);

	const close = (id: string) =>
		setMessages(messages =>
			[...messages.filter(message => message.id !== id)]);

	return (
		<>
			{messages.map((message, index) => (
				<Banner key={index} {...message} close={close} />
			))}
		</>
	);
}
