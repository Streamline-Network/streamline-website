import "../styles/style.scss";

import Banners from "./components/banners/banners";
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
	return (
		<html lang="en">
			<body className={rubik.className}>
				<Header />
				<Banners />
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
