import { useEffect, useRef } from 'react'

import Head from 'next/head'
import Link from 'next/link'
import map from './map.module.scss'

export default function Map() {
  const mapDomain = 'http://104.238.222.147:7782'

  useEffect(() => {
    try {
      window.open(mapDomain, '_blank')
      window.location.href = '/'
    } catch (err) {
      console.log(err)
    }
  }, [])

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
        <h1>Something went wrong when getting the map. The server may be down.</h1>
        <Link href={'/'}>Return home</Link>
        <Link href={mapDomain}>Try again</Link>
      </section>
    </>
  )
}
