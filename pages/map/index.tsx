import { useEffect, useState } from 'react'

import { NextSeo } from 'next-seo'
import stats from '../stats/stats.module.scss'

export default function Map() {
  const [height, setHeight] = useState('100px')

  useEffect(() => {
    function getHeight() {
      const header = document.querySelector<HTMLElement>('header')!
      const footer = document.querySelector<HTMLElement>('footer')!

      setHeight(
        window.innerHeight -
          (header.offsetHeight + footer.offsetHeight) -
          4 +
          'px'
      )
    }

    window.addEventListener('resize', getHeight)
    getHeight()

    return () => window.removeEventListener('resize', getHeight)
  }, [])

  return (
    <>
      <NextSeo
        title="Map - Explore Our World"
        description="Explore the world of Streamline SMP, a vanilla whitelist-only Minecraft server. View our dynamic map and see what’s happening."
      />

      <iframe
        style={{ height }}
        className={stats.frame}
        src="https://srv34.godlike.club:26043/"
      />
    </>
  )
}
