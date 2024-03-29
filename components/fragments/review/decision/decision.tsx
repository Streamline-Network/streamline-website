import { ApplyApplicationState, Comment } from 'pages/api/db/database'
import { useMemo, useState } from 'react'

import Blocks from '../../blocks/blocks'
import { QueryResponse } from 'pages/api/db/forms/apply/collection-group'
import classNames from 'classnames'
import customFetch from 'utils/fetch'
import decision from './decision.module.scss'
import { useSession } from 'next-auth/react'

export default function Decision({
  applicationData,
  setApplicationData,
  currentApplicationUuid,
}: DecisionProps) {
  const { data, status } = useSession()
  const [reasoning, setReasoning] = useState('')
  const [error, setError] = useState<undefined | string>()
  const currentApplicationIndex = useMemo(() => {
    return applicationData.findIndex(
      ({ application }) => application.userUuid === currentApplicationUuid
    )
  }, [applicationData, currentApplicationUuid])

  async function changeState(state: ApplyApplicationState) {
    const appData = structuredClone(applicationData)
    const currentApplication = appData[currentApplicationIndex]

    setError(undefined)

    const comment: Comment = {
      message: reasoning,
      senderId: data!.id,
      time: Date.now(),
      name: data!.user!.name!,
      senderPicture: data!.user!.image!,
      decision: state,
    }

    currentApplication.application.state = state
    if (state === 'denied' && reasoning) currentApplication.application.deniedReason = reasoning
    currentApplication.action = reasoning ? 'decidedWithReason' : 'decided'
    currentApplication.application.comments
      ? currentApplication.application.comments.push(comment)
      : (currentApplication.application.comments = [comment])

    const res = await customFetch<undefined, QueryResponse>(
      '/api/db/forms/apply/review',
      'POST',
      currentApplication
    )

    if (res.response.ok) {
      setApplicationData(appData)
      setReasoning('')
    } else {
      setError('Something went wrong!')
    }
  }

  const buttons: Button[] = [
    {
      name: 'Deny',
      class: 'deny',
      function: async () => {
        await changeState('denied')
      },
    },
    {
      name: 'Hold For Review',
      class: 'review',
      function: async () => {
        await changeState('pending')
      },
    },
    {
      name: 'Accept',
      class: 'accept',
      function: async () => {
        await changeState('accepted')
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
              Note: Users will get notified of their application getting accepted or denied, so
              choose carefully!
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
                {status === 'authenticated' &&
                  buttons.map((button, i) => (
                    <button key={i} className={decision[button.class]} onClick={button.function}>
                      {button.name}
                    </button>
                  ))}
              </div>
              {error && <div className={decision.error}>{error}</div>}
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
  function: (e: React.MouseEvent) => void | Promise<void>
}
