import { useEffect, useRef } from 'react'

import classNames from 'classnames'
import progressTracker from './progress-tracker.module.scss'

export default function ProgressTracker({ steps, currentStepIndex }: ProgressTrackerProps) {
  const wrapperRef = useRef(null)
  const indicatorWrapperRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    // Don't update anything if max step is already reached.
    if (currentStepIndex > steps.length - 1) return

    const percent = (currentStepIndex / (steps.length - 1)) * 100

    const wrapperElem: HTMLDivElement = wrapperRef.current!
    const indicatorWrapperElem: HTMLDivElement = indicatorWrapperRef.current!
    const currentSectionElem =
      indicatorWrapperElem.querySelectorAll<HTMLDivElement>('section')[currentStepIndex]!
    const lineElem: HTMLDivElement = lineRef.current!

    // Check if at the beginning or end step. If so, just scroll as much as possible.
    if (steps.length - 1 !== currentStepIndex || !currentSectionElem) {
      currentSectionElem.scrollIntoView({ behavior: 'smooth', inline: 'center' })
    } else {
      currentSectionElem
        ? wrapperElem.scrollTo({ left: wrapperElem.scrollWidth, behavior: 'smooth' })
        : wrapperElem.scrollTo({ left: 0, behavior: 'smooth' })
    }

    const previousPercentage = (() => {
      const x = lineElem.style.getPropertyValue('--percent-filled')
      return parseInt(x.slice(0, x.length - 1))
    })()

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
    }

    lineElem.style.setProperty('--percent-filled', percent + '%')

    if (!isNaN(previousPercentage) && previousPercentage !== null && previousPercentage !== percent)
      tween()
  }, [currentStepIndex, steps.length])

  return (
    <div ref={wrapperRef} className={progressTracker.wrapper}>
      <div ref={indicatorWrapperRef} className={progressTracker.indicatorWrapper}>
        <div ref={lineRef} className={progressTracker.line} />
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
