'use client'

import { useEffect, useState } from 'react'

import { Database } from 'pages/api/db/database'
import Loading from 'components/fragments/application/loading'
import { NextSeo } from 'next-seo'
import ProgressTracker from 'components/fragments/progress-tracker/progress-tracker'
import Reviewed from 'components/fragments/application/reviewed'
import Status from 'components/fragments/application/status'
import Submit from 'components/fragments/application/submit'
import apply from './apply.module.scss'
import classNames from 'classnames'
import customFetch from 'utils/fetch'
import { useRouter } from 'next/router'

type Steps = { [key: string]: number }

export const STEPS: Steps = {
  submit: 0,
  status: 1,
  reviewed: 2,
}

export default function Steps() {
  const router = useRouter()
  const step = router.query.step as string
  const [currentStepIndex, setCurrentStepIndex] = useState<number | undefined>(
    undefined
  )

  function StepSwitcher({ stage }: { stage?: number }) {
    if (stage === undefined) return <Loading />
    switch (stage) {
      case 0:
        return (
          <>
            <h2 className={apply.subTitle}>Apply to join</h2>
            <Submit setCurrentStepIndex={setCurrentStepIndex} />
          </>
        )
      case 1:
        return (
          <>
            <h2 className={apply.subTitle}>Application Status</h2>
            <Status setCurrentStepIndex={setCurrentStepIndex} />
          </>
        )
      case 2:
        return (
          <>
            <h2 className={apply.subTitle}>What&apos;s Next?</h2>
            <Reviewed setCurrentStepIndex={setCurrentStepIndex} />
          </>
        )
      default:
        return <h2>Oh no, something went wrong!</h2>
    }
  }

  useEffect(() => {
    // Checks for changes every minute.
    const intervalId = setInterval(() => {
      customFetch<Database.UserState>('/api/db/docs?path=userState/{id}')
        .then(({ data }) => {
          if (data.applicationStage === null) {
            console.warn('Failed to refresh application stage.')
          } else {
            setCurrentStepIndex(data.applicationStage)
          }
        })
        .catch(e => console.warn('Failed to refresh application stage.', e))
    }, 60000)

    return () => clearInterval(intervalId)
  }, [currentStepIndex])

  useEffect(() => {
    if (step === undefined) return
    setCurrentStepIndex(STEPS[step])
  }, [step])

  return (
    <>
      <NextSeo
        title="Application"
        description="Fill out the application and see it's progress/status."
      />

      <h1 className={classNames('blue', apply.header)}>Application</h1>

      <div>
        <ProgressTracker
          steps={['Apply', 'Applied', 'Application Reviewed', "What's next?"]}
          currentStepIndex={currentStepIndex === 2 ? 3 : currentStepIndex}
        />

        <StepSwitcher stage={currentStepIndex} />
      </div>
    </>
  )
}
