import React, { useEffect, useRef } from 'react'

import ApplicationCard from './card'
import { Database } from 'pages/api/db/database'
import card from './card-styles.module.scss'

export default function CardSelector({
  applications,
  currentApplicationUuid,
  setCurrentApplicationUuid,
  loadMore,
}: CardSelectorProps) {
  const wrapperRef = useRef(null)
  const detectorRef = useRef(null)

  useEffect(() => {
    const detector = detectorRef.current

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore()
          console.log('Load more')
        }
      },
      { threshold: 0.5 }
    )

    if (detector) {
      observer.observe(detector)
    }

    return () => {
      if (detector) {
        observer.unobserve(detector)
      }
    }
  }, [loadMore])

  function handleClickAndDrag(e: React.MouseEvent) {
    let hasDrug = false

    const wrapper: HTMLDivElement = wrapperRef.current!

    const move = (e: MouseEvent) => {
      wrapper.scrollBy({ left: e.movementX * -1 })
      if (e.movementX > 2 || e.movementX < -2) {
        hasDrug = true
      }
    }

    const mouseUp = () => {
      const card = e.target as HTMLElement
      if (card.id && hasDrug === false) {
        card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
        setCurrentApplicationUuid(card.id)
      }

      wrapper.removeEventListener('mousemove', move)
      wrapper.removeEventListener('mouseleave', mouseLeave)
    }

    const mouseLeave = () => {
      wrapper.removeEventListener('mousemove', move)
      wrapper.removeEventListener('mouseup', mouseUp)
    }

    wrapper.addEventListener('mousemove', move)
    wrapper.addEventListener('mouseup', mouseUp, {
      once: true,
    })
    wrapper.addEventListener('mouseleave', mouseLeave, { once: true })

    hasDrug = false
  }

  useEffect(() => {
    const wrapper: HTMLDivElement = wrapperRef.current!
    if (currentApplicationUuid === -1) {
      const latestUuid = applications[0].minecraftUuid
      setCurrentApplicationUuid(latestUuid)
      const latestElem = wrapper.querySelector('#' + latestUuid)!
      latestElem.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'auto' })
    }
  }, [applications, currentApplicationUuid, setCurrentApplicationUuid])

  return (
    <div className={card.selector} ref={wrapperRef} onMouseDown={handleClickAndDrag}>
      {applications.map((application, i) => {
        const answers = application.submissionDetails.answers

        let mcVersions: string[] = []

        const versionCheckboxes = answers['What version of Minecraft do you play?'] as {
          [key: string]: boolean
        }

        for (const checkbox of Object.keys(versionCheckboxes)) {
          if ((versionCheckboxes[checkbox] as boolean) === true)
            mcVersions.push(checkbox.split(' ')[0])
        }

        return (
          <ApplicationCard
            key={i}
            age={answers['How old are you?'] as string}
            appliedTime={application.submissionDetails.submissionTime}
            minecraftName={answers['What is your Minecraft Java Edition username?'] as string}
            minecraftUuid={application.minecraftUuid}
            versions={mcVersions}
            state={application.state}
            currentApplicationUuid={currentApplicationUuid}
            setCurrentApplicationUuid={setCurrentApplicationUuid}
          />
        )
      })}
      <div ref={detectorRef} className={card.loadDetector} />
    </div>
  )
}

interface CardSelectorProps {
  applications: Database.Applications.Apply[]
  currentApplicationUuid: string | -1
  setCurrentApplicationUuid: React.Dispatch<React.SetStateAction<string | -1>>

  loadMore: () => void
}
