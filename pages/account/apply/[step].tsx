import { useEffect, useState } from 'react'

import Head from 'next/head'
import ProgressTracker from 'components/fragments/progress-tracker/progress-tracker'
import Reviewed from 'components/fragments/application/reviewed'
import Status from 'components/fragments/application/status'
import Submit from 'components/fragments/application/submit'
import apply from './apply.module.scss'
import classNames from 'classnames'
import { useRouter } from 'next/router'

type Steps = { [key: string]: number }

export const STEPS: Steps = {
  submit: 0,
  status: 1,
  reviewed: 2,
}

function StepSwitcher({ stage }: { stage?: number }) {
  if (stage === undefined) return <p>Loading...</p>
  switch (stage) {
    case 0:
      return (
        <>
          <h2 className={apply.subTitle}>Apply to join</h2>
          <Submit />
        </>
      )
    case 1:
      return (
        <>
          <h2 className={apply.subTitle}>Application Status</h2>
          <Status />
        </>
      )
    case 2:
      return (
        <>
          <h2 className={apply.subTitle}>What&apos;s Next?</h2>
          <Reviewed />
        </>
      )
    default:
      return <h2>Oh no, something went wrong!</h2>
  }
}

export default function Stats() {
  const router = useRouter()
  const step = router.query.step as string
  const [currentStepIndex, setCurrentStepIndex] = useState<number | undefined>(undefined)

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch('/api/db/docs?path=userState/{id}')
        .then(r => r.json())
        .then(r => {
          setCurrentStepIndex(r.data.applicationStage)
        })
    }, 5000)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    if (step === undefined) return
    setCurrentStepIndex(STEPS[step])
  }, [step])

  return (
    <>
      <Head>
        <title>Apply to join</title>
      </Head>

      <h1 className={classNames('blue', apply.header)}>Application</h1>

      <div className={apply.wrapper}>
        <ProgressTracker
          steps={['Apply', 'Applied', 'Application Reviewed', "What's next?"]}
          currentStepIndex={currentStepIndex === 2 ? 3 : currentStepIndex}
        />

        <StepSwitcher stage={currentStepIndex} />
      </div>
    </>
  )
}
