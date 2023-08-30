import { ApplyApplicationState } from 'pages/api/db/database'
import card from './card-styles.module.scss'
import classNames from 'classnames'
import { getRelativeTime } from 'utils/misc'

export default function ApplicationCard({
  minecraftName,
  minecraftUuid,
  userUuid,
  versions,
  age,
  appliedTime,
  state,
  currentApplicationUuid,
  setCurrentApplicationUuid,
}: ApplicationCardProps) {
  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto', style: 'long' })

  const parsedTime = getRelativeTime(appliedTime, rtf)

  function getClassName(state?: ApplyApplicationState) {
    if (state) return state
    else return 'notReviewed'
  }

  return (
    <button
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          const elem = e.target as HTMLButtonElement
          const parsed = elem.id.slice(4)
          elem.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
          setCurrentApplicationUuid(parsed)
        }
      }}
      id={'uuid' + userUuid}
      className={classNames(card.wrapper, card[getClassName(state)], {
        [card.selected]: currentApplicationUuid === userUuid,
      })}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        style={{ imageRendering: 'pixelated' }}
        draggable={false}
        className={card.minecraftSkin}
        src={`https://crafatar.com/avatars/${minecraftUuid}/?overlay=true&size=96`}
        alt="A MC Skin"
        width={93}
        height={93}
      />
      <div>
        <h3 className={card.name}>{minecraftName}</h3>
        <div className={card.details}>
          <span>Applied: {parsedTime}</span>
          <span>
            Version:{' '}
            {versions.length ? versions.reduce((final, current) => `${final}, ${current}`) : 'N/A'}
          </span>
          <span>Age: {age}</span>
        </div>
      </div>
    </button>
  )
}

export interface ApplicationCardProps {
  minecraftName: string
  minecraftUuid: string
  userUuid: string
  versions: string[]
  age: string
  appliedTime: number
  state?: ApplyApplicationState

  currentApplicationUuid: string | -1
  setCurrentApplicationUuid: React.Dispatch<React.SetStateAction<string | -1>>
}
