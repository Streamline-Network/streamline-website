import { useMemo, useState } from 'react'

import { QueryResponse } from 'pages/api/db/forms/apply/collection-group'
import { RiArrowDropDownLine } from 'react-icons/ri'
import classNames from 'classnames'
import { getRelativeTime } from 'utils/misc'
import historyDropdown from './history-dropdown.module.scss'

export default function HistoryDropdown({
  applicationData,
  history,
  setHistory,
}: ApplicationHistoryProps) {
  const [isOpen, setIsOpen] = useState(false)

  const sortedArray = useMemo(() => {
    const prevSubmissions = applicationData.application.previousSubmissions
    if (!prevSubmissions) return undefined
    return prevSubmissions.sort((a, b) => b.submissionTime - a.submissionTime)
  }, [applicationData.application.previousSubmissions])

  const rtf = new Intl.RelativeTimeFormat(undefined, { style: 'long' })

  return (
    <>
      {sortedArray ? (
        <>
          <button onClick={() => setIsOpen(open => !open)} className={historyDropdown.dropdown}>
            Show History - Selected: {history ? getRelativeTime(history, rtf) : 'Latest'}
            <RiArrowDropDownLine
              className={classNames(historyDropdown.arrow, { [historyDropdown.closed]: !isOpen })}
            />
          </button>
          {isOpen && (
            <div className={historyDropdown.itemsWrapper}>
              <button
                onClick={() => {
                  setHistory(undefined)
                }}
                className={classNames({
                  [historyDropdown.selected]: !history,
                })}>
                Latest
              </button>
              {sortedArray!.map((pvs, i) => (
                <button
                  onClick={() => {
                    setHistory(pvs.submissionTime)
                  }}
                  className={classNames({
                    [historyDropdown.selected]: history === pvs.submissionTime,
                  })}
                  key={i}>
                  {getRelativeTime(pvs.submissionTime, rtf)}
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <p>This application has no history!</p>
      )}
    </>
  )
}

interface ApplicationHistoryProps {
  applicationData: QueryResponse
  history?: number
  setHistory: React.Dispatch<React.SetStateAction<number | undefined>>
}
