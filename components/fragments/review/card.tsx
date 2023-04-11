import { ApplyApplicationState } from 'pages/api/db/database'
import Image from 'next/image'
import card from './card-styles.module.scss'
import classNames from 'classnames'
import { getRelativeTime } from 'utils/misc'

export default function ApplicationCard({
  minecraftName,
  minecraftUuid,
  versions,
  age,
  appliedTime,
  state,
  currentApplicationUuid,
}: ApplicationCardProps) {
  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto', style: 'long' })

  const parsedTime = getRelativeTime(appliedTime, rtf)

  function getClassName(state?: ApplyApplicationState) {
    if (state) return state
    else return 'notReviewed'
  }

  return (
    <div
      id={minecraftUuid}
      className={classNames(card.wrapper, card[getClassName(state)], {
        [card.selected]: currentApplicationUuid === minecraftUuid,
      })}>
      <Image
        draggable={false}
        className={card.minecraftSkin}
        src={`https://crafatar.com/avatars/${minecraftUuid}/?overlay`}
        alt="A MC Skin"
        width={93}
        height={93}
      />
      <div>
        <h3 className={card.name}>{minecraftName}</h3>
        <div className={card.details}>
          <span>Applied: {parsedTime}</span>
          <span>Version: {versions.reduce((final, current) => `${final}, ${current}`)}</span>
          <span>Age: {age}</span>
        </div>
      </div>
    </div>
  )
}

export interface ApplicationCardProps {
  minecraftName: string
  minecraftUuid: string
  versions: string[]
  age: string
  appliedTime: number
  state?: ApplyApplicationState

  currentApplicationUuid: string | -1
}
