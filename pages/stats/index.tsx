import Link from 'next/link'
import { NextSeo } from 'next-seo'
import stats from './stats.module.scss'
import { useState } from 'react'

export default function Map() {
  const [hasTried, setHasTried] = useState(false)
  const mapDomain = process.env.NEXT_PUBLIC_STATS_URL

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
        title="Stats - Track Your Progress"
        description="Track your progress on Streamline SMP, a vanilla whitelist-only Minecraft server. See your playtime, deaths, kills and more."
      />

      {!hasTried ? (
        <section className={stats.container}>
          <h1>Continue to stats:</h1>
          <button className={stats.button} onClick={handleCLick}>
            Go to stats
          </button>
        </section>
      ) : (
        <section className={stats.container}>
          <h1>Something went wrong when getting the stats. The server may be down.</h1>
          <Link className={stats.button} href={'/'}>
            Return home
          </Link>
          <button
            className={stats.button}
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
