import { useEffect, useLayoutEffect, useRef } from 'react'

import classNames from 'classnames'
import progressTracker from './progress-tracker.module.scss'

export default function ProgressTracker({ steps, currentStepIndex }: ProgressTrackerProps) {
  const wrapperRef = useRef(null)
  const indicatorWrapperRef = useRef(null)
  const lineRef = useRef(null)

  if (currentStepIndex !== undefined) {
    if (currentStepIndex > steps.length - 1) currentStepIndex = steps.length - 1
    if (currentStepIndex < 0) currentStepIndex = 0
  }

  function scrollToElem(currentSectionElem: HTMLDivElement, wrapperElem: HTMLDivElement) {
    // Check if at the beginning or end step. If so, just scroll as much as possible.

    if (steps.length - 1 !== currentStepIndex || !currentSectionElem) {
      currentSectionElem.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'center' })
    } else {
      currentSectionElem
        ? wrapperElem.scrollTo({ left: wrapperElem.scrollWidth, behavior: 'smooth' })
        : wrapperElem.scrollTo({ left: 0, behavior: 'smooth' })

      wrapperElem.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  useEffect(() => {
    if (currentStepIndex === undefined) return
    const percent = (currentStepIndex / (steps.length - 1)) * 100

    const wrapperElem: HTMLDivElement = wrapperRef.current!
    const indicatorWrapperElem: HTMLDivElement = indicatorWrapperRef.current!
    const currentSectionElem =
      indicatorWrapperElem.querySelectorAll<HTMLDivElement>('section')[currentStepIndex]!
    const lineElem: HTMLDivElement = lineRef.current!

    scrollToElem(currentSectionElem, wrapperElem)

    const previousPercentage = (() => {
      const x = lineElem.style.getPropertyValue('--percent-filled')
      return parseInt(x.slice(0, x.length - 1))
    })()

    if (isNaN(previousPercentage))
      return lineElem.style.setProperty('--percent-filled', percent + '%')

    if (previousPercentage === null || previousPercentage === percent) return

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

      function decr() {
        newValue--
        if (newValue > percent) {
          setTimeout(decr)
        } else {
          newValue = percent
        }
        lineElem.style.setProperty('--percent-filled', newValue + '%')
      }

      previousPercentage < percent ? incr() : decr()
    }

    tween()
  }, [currentStepIndex, steps.length])

  return (
    <div ref={wrapperRef} className={progressTracker.wrapper}>
      <div ref={indicatorWrapperRef} className={progressTracker.indicatorWrapper}>
        <div ref={lineRef} className={progressTracker.line} />
        {steps.map((step, i) => (
          <section key={i}>
            <span
              className={classNames(progressTracker.indicator, {
                [progressTracker.fill]: currentStepIndex !== undefined && i <= currentStepIndex,
              })}>
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
  currentStepIndex?: number
}
