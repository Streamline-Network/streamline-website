import { useEffect, useState } from 'react'

import { Database } from 'pages/api/db/database'
import Loading from './loading'
import { StateData } from 'pages/api/db/sets/state'
import application from './application.module.scss'
import customFetch from 'utils/fetch'

export default function Reviewed({ setCurrentStepIndex }: ReviewedProps) {
  const [accepted, setAccepted] = useState<boolean | undefined>(undefined)
  const [deniedReason, setDeniedReason] = useState<string | undefined>(undefined)
  const [hasFetched, setHasFetched] = useState(false)

  useEffect(() => {
    customFetch<Database.Applications.Apply>('/api/db/docs?path=applications/{id}/types/apply')
      .then(({ response, data }) => {
        if (response.ok) {
          if (data.state === 'accepted') setAccepted(true)
          if (data.state === 'denied') {
            setDeniedReason(data.deniedReason)
            setAccepted(false)
          }

          setHasFetched(true)
        } else {
          setHasFetched(true)
        }
      })
      .catch(e => console.warn(e))
  }, [])

  return (
    <>
      {hasFetched ? (
        accepted === undefined ? (
          <Error setCurrentStepIndex={setCurrentStepIndex} />
        ) : accepted ? (
          <Accepted />
        ) : (
          <Denied reason={deniedReason} setCurrentStepIndex={setCurrentStepIndex} />
        )
      ) : (
        <Loading hideTitle />
      )}
    </>
  )
}

function Accepted() {
  const [copied, setCopied] = useState(false)

  return (
    <>
      <div className={application.block}>
        <h3>Join the Minecraft Server!</h3>
        <p
          onClick={() => {
            if (copied) return
            navigator.clipboard.writeText('play.streamlinesmp.com')
            setCopied(true)

            setTimeout(() => setCopied(false), 1000)
          }}
          className={application.serverIp}>
          {copied ? 'Copied!' : 'play.streamlinesmp.com'}
        </p>
      </div>
      <h2 className={application.subTitle}>More</h2>
      <div className={application.block}>
        <h3>Apply to join staff.</h3>
        <p>You must have been a Streamliner for at least 1 month to join staff.</p>
        <button disabled className={application.blockButton}>
          Currently unavailable
        </button>
      </div>
    </>
  )
}

function Denied({
  reason,
  setCurrentStepIndex,
}: {
  reason?: string
  setCurrentStepIndex: (value: React.SetStateAction<number | undefined>) => void
}) {
  return (
    <>
      <div className={application.block}>
        <h3>Thank you for applying!</h3>
        <p>Unfortunately you have been denied, the reason given was:</p>
        <p className={application.deniedReason}>{reason ?? 'No reason was given!'}</p>
      </div>
      <h2 className={application.subTitle}>Give it another shot!</h2>
      <div className={application.block}>
        <h3>Feel free to re-apply if you think you can make it!</h3>
        <button
          onClick={() => {
            customFetch<undefined, StateData>('/api/db/sets/state', 'POST', {
              entries: { applicationStage: 0 },
            }).then(() => {
              setCurrentStepIndex(0)
            })
          }}
          className={application.blockButton}>
          Re-apply
        </button>
      </div>
    </>
  )
}

function Error({
  setCurrentStepIndex,
}: {
  setCurrentStepIndex: (value: React.SetStateAction<number | undefined>) => void
}) {
  return (
    <div className={application.block}>
      <h3>An error has occurred!</h3>
      <p>We don&apos;t know how you got here! Feel free to go back to safety.</p>
      <button
        className={application.blockButton}
        onClick={() => {
          customFetch<undefined, StateData>('/api/db/sets/state', 'POST', {
            entries: { applicationStage: 1 },
          }).then(() => {
            setCurrentStepIndex(1)
          })
        }}>
        Back To Safety
      </button>
    </div>
  )
}

interface ReviewedProps {
  setCurrentStepIndex: (value: React.SetStateAction<number | undefined>) => void
}
