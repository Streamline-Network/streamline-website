import { useEffect, useState } from 'react'

import { NextSeo } from 'next-seo'
import stats from '../stats/stats.module.scss'

export default function Map() {
  const [height, setHeight] = useState('100px')

  useEffect(() => {
    window.open('http://srv34.godlike.club:26043/', '_blank')

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

      <div
        style={{ height, display: 'grid', alignItems: 'center' }}
        className={stats.frame}>
        <p style={{ textAlign: 'center' }}>
          Opened in new tab, if not click{' '}
          <a href="http://srv34.godlike.club:26043/">here</a>.
        </p>
      </div>

      {/* <iframe
        style={{ height }}
        className={stats.frame}
        src="http://srv34.godlike.club:26043/"
      /> */}
    </>
  )
}
