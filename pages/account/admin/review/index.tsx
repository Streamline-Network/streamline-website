import { useEffect, useState } from 'react'

import Blocks from 'components/fragments/blocks/blocks'
import CardSelector from 'components/fragments/review/card-selector'
import CardSkeleton from 'components/fragments/review/card-skeletons'
import { Database } from 'pages/api/db/database'
import FormBlocks from 'components/fragments/blocks/form-blocks/form-blocks'
import Loading from 'components/fragments/application/loading'
import classNames from 'classnames'
import customFetch from 'utils/fetch'
import review from './review.module.scss'
import sections from 'components/fragments/application/apply-application-data'

export const PER_SECTION_LIMIT = 5

export default function Review() {
  const [query, setQuery] = useState('')
  const [applicationData, setApplicationData] = useState<Database.Applications.Apply[] | undefined>(
    undefined
  )
  const [currentApplicationUuid, setCurrentApplicationUuid] = useState<string | -1>(-1)
  const [allLoaded, setAllLoaded] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

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

  function getSelectedFormData() {
    return applicationData!.find(
      application => application.minecraftUuid === currentApplicationUuid
    )?.submissionDetails
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
            allLoaded={allLoaded}
          />
        ) : (
          <CardSkeleton count={10} />
        )}
        {currentApplicationUuid === -1 ? (
          <Loading hideTitle />
        ) : (
          <FormBlocks
            editable={false}
            numbered
            formInfo={getSelectedFormData()}
            sections={sections}
            save={() => {}}
            submit={{ final: () => {} }}
            checks={[]}
            error={[error, setError]}
          />
        )}
      </div>
    </>
  )
}
