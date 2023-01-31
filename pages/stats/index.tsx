import Head from 'next/head'
import Link from 'next/link'
import stats from './stats.module.scss'

export default function Stats({}: StatsProps) {
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
      <section className={stats.tempWarning}>
        <h1>We apologize but this page isn&lsquo;t set-up yet.</h1>
        <Link href={'/'}>Return home</Link>
      </section>
      {/* <iframe ref={iframeRef} className={map.mapFrame} src={url} /> */}
    </>
  )
}

interface StatsProps {}
