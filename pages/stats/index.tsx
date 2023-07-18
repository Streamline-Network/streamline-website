import { useEffect, useState } from 'react'

import { NextSeo } from 'next-seo'
import stats from './stats.module.scss'

export default function Map() {
  const [height, setHeight] = useState('100px')

  useEffect(() => {
    function getHeight() {
      const header = document.querySelector<HTMLElement>('header')!
      const footer = document.querySelector<HTMLElement>('footer')!

      setHeight(window.innerHeight - (header.offsetHeight + footer.offsetHeight) - 4 + 'px')
    }

    window.addEventListener('resize', getHeight)
    getHeight()

    return () => window.removeEventListener('resize', getHeight)
  }, [])

  return (
    <>
      <NextSeo
        title="Stats - Track Your Progress"
        description="Track your progress on Streamline SMP, a vanilla whitelist-only Minecraft server. See your playtime, deaths, kills and more."
      />
      <iframe
        style={{ height }}
        className={stats.frame}
        src="http://144.217.29.142:8037/server/Streamline%20SMP/overview"
      />
    </>
  )
}
