import { useEffect, useRef } from 'react'

import classNames from 'classnames'
import progressTracker from './progress-tracker.module.scss'

export default function ProgressTracker({ steps, currentStepIndex }: ProgressTrackerProps) {
  const lineRef = useRef(null)

  useEffect(() => {
    if (currentStepIndex > steps.length - 1) return
    let percent = 0
    if (currentStepIndex !== 0) {
      percent = (currentStepIndex / (steps.length - 1)) * 100
    }

    const lineElem: HTMLDivElement = lineRef.current!

    const previousPercentageString = lineElem.style.getPropertyValue('--percent-filled')

    const previousPercentage = parseInt(
      previousPercentageString.slice(0, previousPercentageString.length - 1)
    )

    function tween() {
      let newValue = previousPercentage

      function incr() {
        newValue++
        if (newValue < percent) {
          setTimeout(incr)
        } else {
          newValue = percent
        }
        lineElem.style.setProperty('--percent-filled', newValue + '%')
      }

      incr()

      return newValue
    }

    lineElem.style.setProperty('--percent-filled', percent + '%')

    if (!isNaN(previousPercentage) && previousPercentage !== null && previousPercentage !== percent)
      tween()
  }, [currentStepIndex, steps.length])

  return (
    <div className={progressTracker.wrapper}>
      <div ref={lineRef} className={progressTracker.line} />
      <div className={progressTracker.indicatorWrapper}>
        {steps.map((step, i) => (
          <section key={i}>
            <span
              className={classNames(
                progressTracker.indicator,
                i <= currentStepIndex && progressTracker.fill
              )}>
              {step}
            </span>
          </section>
        ))}
      </div>
    </div>
  )
}

interface ProgressTrackerProps {
  steps: string[]
  currentStepIndex: number
}
