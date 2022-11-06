import "../styles/style.scss";

import Banner, { BannerProps } from "./components/banner/banner";

import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import { PageConfig } from "next";
import React from "react";
import { Rubik } from "@next/font/google";

const rubik = Rubik({
	subsets: ["latin"],
	preload: true,
	fallback: ["sans-serif"],
});

export default function Layout({ children }: LayoutProps) {
	const messages: BannerProps[] = [
		{
			message:
				"We are currently in between seasons and are not accepting new people. Season 4 releases November the 11th!",
		},
	];
	return (
		<html>
			<body className={rubik.className}>
				<Header />
				{messages.map((message, index) => (
					<Banner key={index} {...message} />
				))}
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	);
}

interface LayoutProps {
	children: React.ReactNode;
}

export const config: PageConfig = {
	unstable_runtimeJS: false,
};
