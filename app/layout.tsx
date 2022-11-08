import "../styles/style.scss";

import { AnalyticsWrapper } from "./components/analytics/analytics";
import Banners from "./components/banners/banners";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import { PageConfig } from "next";
import React from "react";
import { Rubik } from "@next/font/google";
import { Session } from "next-auth/core/types";
import Wrapper from "./components/wrapper/wrapper";

const rubik = Rubik({
	subsets: ["latin"],
	preload: true,
	fallback: ["sans-serif"],
});

export default function Layout({ children, session }: LayoutProps) {
	return (
		<html lang="en">
			<body className={rubik.className}>
				<Wrapper session={session}>
					<Header />
					<Banners />
					<main>{children}</main>
					<Footer />
					<AnalyticsWrapper />
				</Wrapper>
			</body>
		</html>
	);
}

interface LayoutProps {
	children: React.ReactNode;
	session: Session;
}

export const config: PageConfig = {
	unstable_runtimeJS: false,
};
