import Head from 'next/head'
import ProgressTracker from 'components/fragments/progress-tracker/progress-tracker'
import apply from './apply.module.scss'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { useState } from 'react'

type Steps = { [key: string]: number }

export const STEPS: Steps = {
  submit: 0,
  status: 1,
  reviewed: 2,
}

function StepSwitcher({ stage }: { stage: number }) {
  return <h1>{stage}</h1>
}

export default function Stats({}: StatsProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const router = useRouter()

  const step = router.query.step as string

  return (
    <>
      <Head>
        <title>Apply to join</title>
      </Head>
      <h1
        onClick={() => setCurrentStepIndex(currentStepIndex + 1)}
        className={classNames('red', apply.header)}>
        Application
      </h1>

      <div className={apply.wrapper}>
        <ProgressTracker
          steps={['Apply', 'Applied', 'Application Reviewed', "What's next?"]}
          currentStepIndex={currentStepIndex}
        />

        <StepSwitcher stage={STEPS[step]} />
      </div>
    </>
  )
}

interface StatsProps {}
