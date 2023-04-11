import { useEffect, useState } from 'react'

import Blocks from 'components/fragments/blocks/blocks'
import CardSelector from 'components/fragments/review/card-selector'
import { Database } from 'pages/api/db/database'
import Loading from 'components/fragments/application/loading'
import classNames from 'classnames'
import customFetch from 'utils/fetch'
import review from './review.module.scss'

const PER_SECTION_LIMIT = 5

export default function Review() {
  const [query, setQuery] = useState('')
  const [applicationData, setApplicationData] = useState<Database.Applications.Apply[] | undefined>(
    undefined
  )
  const [currentApplicationUuid, setCurrentApplicationUuid] = useState<string | -1>(-1)
  const [allLoaded, setAllLoaded] = useState(false)

  useEffect(() => {
    customFetch<Database.Applications.Apply[]>(
      `/api/db/forms/collection-group?applicationType=apply&limit=${PER_SECTION_LIMIT}&direction=desc`
    ).then(({ data }) => {
      setApplicationData(data)
    })
  }, [])

  function loadMore() {
    if (!applicationData || allLoaded) return

    const oldest = applicationData[applicationData.length - 1].submissionDetails.submissionTime

    customFetch<Database.Applications.Apply[]>(
      `/api/db/forms/collection-group?applicationType=apply&limit=${PER_SECTION_LIMIT}&direction=desc&startAfter=${oldest}`
    ).then(({ data }) => {
      if (data[0] === undefined) return setAllLoaded(true)
      setApplicationData([...applicationData, ...data])
    })
  }

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
            loadMore={loadMore}
          />
        ) : (
          <Loading hideTitle />
        )}
        <Loading />
      </div>
    </>
  )
}
