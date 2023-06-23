import Link from 'next/link'
import { NextSeo } from 'next-seo'
import map from './map.module.scss'
import { useState } from 'react'

export default function Map() {
  const [hasTried, setHasTried] = useState(false)
  const mapDomain = process.env.NEXT_PUBLIC_MAP_URL

  function handleCLick() {
    try {
      window.open(mapDomain, '_blank')
    } catch (err) {
      setHasTried(true)
    }
  }

  return (
    <>
      <NextSeo
        title="Map - Explore Our World"
        description="Explore the world of Streamline SMP, a vanilla whitelist-only Minecraft server. View our dynamic map and see what’s happening."
      />

      {!hasTried ? (
        <section className={map.container}>
          <h1>Continue to map:</h1>
          <button className={map.button} onClick={handleCLick}>
            Go to map
          </button>
        </section>
      ) : (
        <section className={map.container}>
          <h1>Something went wrong when getting the map. The server may be down.</h1>
          <Link className={map.button} href={'/'}>
            Return home
          </Link>
          <button
            className={map.button}
            onClick={() => {
              setHasTried(false)
            }}>
            Try again
          </button>
        </section>
      )}
    </>
  )
}
