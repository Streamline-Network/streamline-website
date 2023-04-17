import card from './card-styles.module.scss'
import classNames from 'classnames'

export default function CardSkeleton({ count }: CardSkeletonProps) {
  function generateSkeletons() {
    let skeletons: React.ReactNode[] = []

    for (let i = 0; i < count; i++) {
      skeletons.push(
        <div
          key={i}
          style={{ height: '135px' }}
          className={classNames(card.wrapper, card.skeleton)}
        />
      )
    }
    return skeletons
  }

  return <div className={card.selector}>{generateSkeletons()}</div>
}

interface CardSkeletonProps {
  count: number
}
