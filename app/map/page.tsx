"use client";

import { useEffect, useRef } from "react";

import Link from "next/link";
import { PageConfig } from "next";
import map from "./map.module.scss";

export default function Map() {
	/*
	const url = process.env.MAP_URL || "";
	const url = "https://example.com";
	const iframeRef = useRef<HTMLIFrameElement>(null);

	useEffect(() => {
		console.log(iframeRef.current?.contentWindow);

		iframeRef.current?.contentWindow?.addEventListener("DOMContentLoaded", () => {
			console.log("something in the console");
		});
	}, []);
	*/

	return (
		<>
			<section className={map.tempWarning}>
				<h1>We apologize but this page isn&lsquo;t set-up yet.</h1>
				<Link href={"/"}>Return home</Link>
			</section>
			{/* <iframe ref={iframeRef} className={map.mapFrame} src={url} /> */}
		</>
	);
}

export const config: PageConfig = {
	unstable_runtimeJS: false,
};
