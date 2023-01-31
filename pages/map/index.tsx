import { useEffect, useRef } from 'react'

import Head from 'next/head'
import Link from 'next/link'
import map from './map.module.scss'

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
      <Head>
        <title>Explore the World of Vanilla SMP Whitelist-Only Minecraft Server</title>
        <meta
          name="description"
          content="ake a journey through the world of Vanilla SMP Whitelist-Only Minecraft Server. Discover new lands and adventures. Join now!"
        />
        <meta name="keywords" content="Minecraft server map" />
      </Head>
      <section className={map.tempWarning}>
        <h1>We apologize but this page isn&lsquo;t set-up yet.</h1>
        <Link href={'/'}>Return home</Link>
      </section>
      {/* <iframe ref={iframeRef} className={map.mapFrame} src={url} /> */}
    </>
  )
}
