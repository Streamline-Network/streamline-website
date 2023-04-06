import Image, { StaticImageData } from 'next/image'

import { SetStateAction } from 'react'
import { StateData } from 'pages/api/db/sets/state'
import application from './application.module.scss'
import classnames from 'classnames'
import customFetch from 'utils/fetch'
import discordImage from 'images/discord.png'
import websiteImage from 'images/website.png'

export default function Status({ setCurrentStepIndex }: StatusProps) {
  const blocks: Block[] = [
    {
      title:
        'Get notified on the Streamline SMP Discord Server when your application has been accepted.',
      coloredBlock: {
        image: discordImage,
        text: 'Get notified about your application on Discord.',
        color: 'blue',
      },
    },
    {
      title:
        'Come back to this page to see what status your application is at, or come back to modify your application.',
      coloredBlock: {
        image: websiteImage,
        text: 'Check back here to see your application progress.',
        color: 'green',
      },
    },
  ]

  return (
    <>
      <div className={application.wrapper}>
        {blocks.map(({ title, coloredBlock }, i) => (
          <div key={i} className={application.block}>
            <h3>{title}</h3>

            <div
              className={classnames(application.block, application.colorBlock, coloredBlock.color)}>
              <Image src={coloredBlock.image} alt="The Discord Logo" />
              <p>{coloredBlock.text}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          const data: StateData = { entries: { applicationStage: 0 } }

          customFetch('/api/db/sets/state', 'POST', data).then(({ response }) => {
            if (response.ok) setCurrentStepIndex(0)
          })
        }}
        className={application.button}>
        Unsubmit & Modify Your Application
      </button>
    </>
  )
}

type Block = {
  title: string
  coloredBlock: {
    image: StaticImageData
    text: string
    color: string
  }
}

interface StatusProps {
  setCurrentStepIndex: (value: SetStateAction<number | undefined>) => void
}
