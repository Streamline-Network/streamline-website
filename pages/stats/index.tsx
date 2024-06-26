import { useEffect, useState } from 'react'

import { NextSeo } from 'next-seo'
import stats from './stats.module.scss'

export default function Map() {
  const [height, setHeight] = useState('100px')

  useEffect(() => {
    window.open('http://srv34.godlike.club:26914/', '_blank')

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
        title="Stats - Track Your Progress"
        description="Track your progress on Streamline SMP, a vanilla whitelist-only Minecraft server. See your playtime, deaths, kills and more."
      />

      <div
        style={{ height, display: 'grid', alignItems: 'center' }}
        className={stats.frame}>
        <p style={{ textAlign: 'center' }}>
          Opened in new tab, if not click{' '}
          <a
            style={{ color: 'lightblue', textDecoration: 'underline' }}
            href="http://srv34.godlike.club:26914/">
            here
          </a>
          .
        </p>
      </div>
    </>
  )
}
