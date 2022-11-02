import '/styles/style.scss';

import { Rubik } from '@next/font/google';
import Head from "next/head";
import React from 'react';

import Banner, { BannerProps } from './components/banner/banner';
import Footer from './components/footer/footer';
import Header from './components/header/header';

const rubik = Rubik({
	subsets: ['latin'],
	preload: true,
	fallback: ['sans-serif'],
});

export default function Layout({ children }: LayoutProps) {
	const messages: BannerProps[] = [
		{
			title: '',
			message:
				'We are currently in between seasons and are not accepting new people. Expect season four summer of 2023.',
			color: '',
		},
	];
	return (
		<html className={rubik.className}>
			<Head><></></Head>
			<body>
				<Header />
				{/*messages.map((message, index) => (
					<Banner key={index} {...message} />
				))*/}
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	);
}

interface LayoutProps {
	children: React.ReactNode;
}
