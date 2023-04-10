import { useEffect, useState } from 'react'

import Blocks from 'components/fragments/blocks/blocks'
import CardSelector from 'components/fragments/review/card-selector'
import { Database } from 'pages/api/db/database'
import Loading from 'components/fragments/application/loading'
import classNames from 'classnames'
import review from './review.module.scss'

export default function Review() {
  const [query, setQuery] = useState('')
  const [applicationData, setApplicationData] = useState<Database.Applications.Apply[] | undefined>(
    undefined
  )
  //? -1 means select the latest.
  const [currentApplicationUuid, setCurrentApplicationUuid] = useState<string | -1>(-1)

  // useEffect(() => {

  // }, [])

  return (
    <>
      <h1 className={classNames(review.title, 'green')}>Applications</h1>
      <div>
        <h2 className={review.subheader}>Filter applications</h2>
        <Blocks
          blockArr={[
            {
              title: 'Search applications',
              paragraphs: [
                <>
                  Preform a fuzzy search on applications, search by age, name, or Minecraft name.
                </>,
                <>
                  <input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Began typing to search..."
                    className={review.search}
                  />
                </>,
              ],
            },
          ]}
        />
        <h2 className={review.subheader}>Select an application</h2>
        {applicationData ? (
          <CardSelector
            applications={applicationData}
            currentApplicationUuid={currentApplicationUuid}
            setCurrentApplicationUuid={setCurrentApplicationUuid}
          />
        ) : (
          <Loading hideTitle />
        )}
      </div>
    </>
  )
}
