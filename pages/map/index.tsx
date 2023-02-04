import { useEffect, useRef } from 'react'

import Head from 'next/head'
import Link from 'next/link'
import map from './map.module.scss'

export default function Map() {
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
      <iframe className={map.mapFrame} src={'http://dynmap.streamlinesmp.com/'} />
    </>
  )
}
