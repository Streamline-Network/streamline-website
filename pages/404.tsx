import { useEffect, useState } from 'react'

import classNames from 'classnames'
import custom404 from './404.module.scss'

const NUMBER_OF_CLICKS_NEEDED = 10

export default function Custom404() {
  const [height, setHeight] = useState('100px')
  const [clickAmount, setClickAmount] = useState(0)

  useEffect(() => {
    function getHeight() {
      const header = document.querySelector<HTMLElement>('header')!
      const footer = document.querySelector<HTMLElement>('footer')!
      const title = document.querySelector<HTMLElement>('h1')!
      const message = document.querySelector<HTMLElement>('h2')!

      const contentHeight = window.innerHeight - (header.offsetHeight + footer.offsetHeight) - 4

      setHeight(contentHeight - title.offsetHeight - message.offsetHeight - 45 + 'px')
    }

    window.addEventListener('resize', getHeight)
    getHeight()

    return () => window.removeEventListener('resize', getHeight)
  }, [])
  return (
    <>
      <h1 className={classNames(custom404.title, 'red')}>An Error Has Occurred</h1>
      <div className={custom404.wrapper}>
        <h2
          onClick={() => {
            setClickAmount(clickAmount + 1)
          }}>
          Error 404 | Page not found!
        </h2>
        {clickAmount >= NUMBER_OF_CLICKS_NEEDED && (
          <embed
            src="https://minesweeper.streamlinesmp.com"
            className={custom404.game}
            width={'100%'}
            height={height}
          />
        )}
      </div>
    </>
  )
}
