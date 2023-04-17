import { ApplyApplicationState } from 'pages/api/db/database'
import card from '../cards/card-styles.module.scss'
import classNames from 'classnames'
import filter from './filter.module.scss'

export default function Filter({ filterTags, setFilterTags }: FilterProps) {
  function getClassName(tag: FilterTag) {
    if (tag.state) return tag.state
    return 'notReviewed'
  }

  return (
    <div className={filter.filter}>
      {filterTags.map((tag, i) => (
        <button
          onClick={e => {
            const elem = e.target as HTMLButtonElement
            let filter = filterTags.findIndex(filter => filter.state === elem.id)
            if (filter === -1) filter = 0

            const tags = [...filterTags]
            tags[filter].selected = !tags[filter].selected
            setFilterTags(tags)
          }}
          id={tag.state}
          className={classNames(filter.tag, card[getClassName(tag)], {
            [filter.selected]: tag.selected,
          })}
          key={i}>
          {tag.name}
        </button>
      ))}
    </div>
  )
}

interface FilterProps {
  filterTags: FilterTag[]
  setFilterTags: React.Dispatch<React.SetStateAction<FilterTag[]>>
}

export type FilterTag = {
  name: string
  state?: ApplyApplicationState
  selected: boolean
}
