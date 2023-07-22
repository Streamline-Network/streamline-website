import { useEffect, useState } from 'react'

import { NextSeo } from 'next-seo'
import customFetch from 'utils/fetch'
import stats from './stats.module.scss'

export default function Map() {
  const [height, setHeight] = useState('100px')
  const [statsPage, setStatsPage] = useState<string>()

  useEffect(() => {
    function getHeight() {
      const header = document.querySelector<HTMLElement>('header')!
      const footer = document.querySelector<HTMLElement>('footer')!

      setHeight(window.innerHeight - (header.offsetHeight + footer.offsetHeight) - 4 + 'px')
    }

    window.addEventListener('resize', getHeight)
    getHeight()

    // fetch('/api/reverse-proxy?page=' + process.env.NEXT_PUBLIC_STATS_URL).then(r =>
    //   r.text().then(r => setStatsPage(r))
    // )

    return () => window.removeEventListener('resize', getHeight)
  }, [])

  return (
    <>
      <NextSeo
        title="Stats - Track Your Progress"
        description="Track your progress on Streamline SMP, a vanilla whitelist-only Minecraft server. See your playtime, deaths, kills and more."
      />
      <iframe style={{ height }} className={stats.frame} src="/proxyStats/server" />

      {/* {statsPage ? (
        <iframe style={{ height }} className={stats.frame} srcDoc={statsPage}></iframe>
      ) : (
        <p>Loading...</p>
      )} */}
    </>
  )
}
