import Link from 'next/link'
import stats from './stats.module.scss'

export default function Stats({}: StatsProps) {
  return (
    <>
      <section className={stats.tempWarning}>
        <h1>We apologize but this page isn&lsquo;t set-up yet.</h1>
        <Link href={'/'}>Return home</Link>
      </section>
      {/* <iframe ref={iframeRef} className={map.mapFrame} src={url} /> */}
    </>
  )
}

interface StatsProps {}
