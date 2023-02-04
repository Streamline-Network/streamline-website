import Head from 'next/head'
import Link from 'next/link'
import stats from './stats.module.scss'
import { useState } from 'react'

export default function Map() {
  const [hasTried, setHasTried] = useState(false)
  const mapDomain = 'http://104.238.222.147:7781'

  function handleCLick() {
    try {
      window.open(mapDomain, '_blank')
    } catch (err) {
      setHasTried(true)
    }
  }

  return (
    <>
      <Head>
        <title>
          Check out the Latest Stats for the Streamline SMP Whitelist-Only Minecraft Server
        </title>
        <meta
          name="description"
          content="Stay up to date with the latest stats for the best Vanilla SMP Whitelist-Only Minecraft Server. Check out player counts, activity, and more."
        />
        <meta name="keywords" content="Minecraft server stats" />
      </Head>

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
