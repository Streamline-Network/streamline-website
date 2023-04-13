import { useMemo, useState } from 'react'

import Blocks from '../blocks/blocks'
import { QueryResponse } from 'pages/api/db/forms/collection-group'
import classNames from 'classnames'
import decision from './decision.module.scss'

export default function Decision({
  applicationData,
  setApplicationData,
  currentApplicationUuid,
}: DecisionProps) {
  const [reasoning, setReasoning] = useState('')
  const currentApplicationIndex = useMemo(() => {
    return applicationData.findIndex(
      ({ application }) => application.minecraftUuid === currentApplicationUuid
    )
  }, [applicationData, currentApplicationUuid])

  const buttons: Button[] = [
    {
      name: 'Deny',
      class: 'deny',
      function: () => {
        const appData = [...applicationData]
        appData[currentApplicationIndex].application.state = 'denied'
        setApplicationData(appData)
      },
    },
    {
      name: 'Hold For Review',
      class: 'review',
      function: () => {
        const appData = [...applicationData]
        appData[currentApplicationIndex].application.state = 'pending'
        setApplicationData(appData)
      },
    },
    {
      name: 'Accept',
      class: 'accept',
      function: () => {
        const appData = [...applicationData]
        appData[currentApplicationIndex].application.state = 'accepted'
        setApplicationData(appData)
      },
    },
  ]

  function getClass() {
    switch (applicationData[currentApplicationIndex].application.state) {
      case 'accepted':
        return 'accept'
      case 'denied':
        return 'deny'
      case 'pending':
        return 'review'
      default:
        return 'pending'
    }
  }

  return (
    <Blocks
      blockArr={[
        {
          title: 'Review application',
          paragraphs: [<>Remember to give a reason for denying, and holding for review!</>],
        },
        {
          title: 'Give your reasoning',
          paragraphs: [
            <>
              Note: Users can see the reason they were denied, if there is no reason given, they see
              &quot;No reason given&quot;.
            </>,
            <>
              <textarea
                className={decision.reason}
                value={reasoning}
                placeholder="What is your reason for your decision?"
                onChange={e => setReasoning(e.target.value)}
              />
            </>,
            <>
              <div className={decision.buttonWrapper}>
                {buttons.map((button, i) => (
                  <button key={i} className={decision[button.class]} onClick={button.function}>
                    {button.name}
                  </button>
                ))}
              </div>
              <div className={classNames(decision.statusLine, decision[getClass()])} />
            </>,
          ],
        },
      ]}
    />
  )
}

interface DecisionProps {
  currentApplicationUuid: string

  applicationData: QueryResponse[]
  setApplicationData: React.Dispatch<React.SetStateAction<QueryResponse[] | undefined>>
}

type Button = {
  name: string
  class: string
  function: () => void
}
