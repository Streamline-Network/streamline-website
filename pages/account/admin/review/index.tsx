import Filter, { FilterTag } from '../../../../components/fragments/review/filter'
import { useEffect, useState } from 'react'

import Blocks from 'components/fragments/blocks/blocks'
import CardSelector from 'components/fragments/review/card-selector'
import CardSkeleton from 'components/fragments/review/card-skeletons'
import { Database } from 'pages/api/db/database'
import Decision from 'components/fragments/review/decision'
import FormBlocks from 'components/fragments/blocks/form-blocks/form-blocks'
import FuzzySearch from 'fuzzy-search'
import Loading from 'components/fragments/application/loading'
import classNames from 'classnames'
import customFetch from 'utils/fetch'
import review from './review.module.scss'
import sections from 'components/fragments/application/apply-application-data'

export const PER_SECTION_LIMIT = 5
const SEARCH_AMOUNT = 50

export default function Review() {
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [applicationData, setApplicationData] = useState<Database.Applications.Apply[] | undefined>(
    undefined
  )
  const [currentApplicationUuid, setCurrentApplicationUuid] = useState<string | -1>(-1)
  const [queriedApplicationData, setQueriedApplicationData] = useState<
    Database.Applications.Apply[] | undefined
  >(undefined)
  const [filteredApplicationData, setFilteredApplicationData] = useState<
    Database.Applications.Apply[] | undefined
  >(undefined)
  const [allLoaded, setAllLoaded] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const [filters, setFilters] = useState<FilterTag[]>([
    { name: 'Pending Review', selected: false },
    { name: 'Denied', selected: false, state: 'denied' },
    { name: 'Held For Review', selected: false, state: 'pending' },
    { name: 'Accepted', selected: false, state: 'accepted' },
  ])

  useEffect(() => {
    customFetch<Database.Applications.Apply[]>(
      `/api/db/forms/collection-group?applicationType=apply&limit=${PER_SECTION_LIMIT}&direction=desc`
    ).then(({ data }) => {
      setApplicationData(data)
    })
  }, [])

  function fetchSearchData() {
    setApplicationData(undefined)

    customFetch<Database.Applications.Apply[]>(
      `/api/db/forms/collection-group?applicationType=apply&limit=${SEARCH_AMOUNT}&direction=desc`
    ).then(({ data }) => {
      setApplicationData(data)
    })
  }

  // Reset if there are no filters to allow users to load past 50
  useEffect(() => {
    const isFiltering = filters.findIndex(filter => filter.selected) !== -1

    if (!query && !isFiltering) {
      if (!applicationData || applicationData.length === SEARCH_AMOUNT) setAllLoaded(false)
    }
  }, [applicationData, filters, query])

  // Generate and reset queriedApplicationData
  useEffect(() => {
    if (!query) {
      setIsSearching(false)
      setQueriedApplicationData(undefined)
      return
    }

    if (!isSearching) {
      if (!applicationData || (applicationData.length < SEARCH_AMOUNT && !allLoaded)) {
        fetchSearchData()
      }

      setIsSearching(true)
      setAllLoaded(true)
    }

    if (!applicationData) return

    function getAllQuestions() {
      const questions = applicationData![0].submissionDetails.answers

      let final: string[] = []
      for (const question of Object.keys(questions)) {
        final.push(`submissionDetails.answers.${question}`)
      }

      return final
    }

    const searcher = new FuzzySearch(applicationData, ['minecraftUuid', ...getAllQuestions()], {
      sort: true,
    })
    setCurrentApplicationUuid(-1)

    setQueriedApplicationData(searcher.search(query))
  }, [applicationData, isSearching, query, filters, allLoaded])

  // Generate and reset filteredApplicationData
  useEffect(() => {
    function filterData(data: Database.Applications.Apply) {
      const allowedStates = filters.filter(state => state.selected)
      const stateArray = allowedStates.map(filter => filter.state)

      if (stateArray.includes(data.state)) return true

      return false
    }

    const isFiltering = filters.findIndex(filter => filter.selected) !== -1

    if (isFiltering) {
      if ((!applicationData || applicationData.length < SEARCH_AMOUNT) && !allLoaded) {
        fetchSearchData()
      }
      setAllLoaded(true)

      if (!applicationData) return

      const filteredData = queriedApplicationData
        ? queriedApplicationData.filter(filterData)
        : applicationData.filter(filterData)

      setFilteredApplicationData(filteredData)

      setCurrentApplicationUuid(-1)
    }

    if (!isFiltering) {
      setFilteredApplicationData(undefined)
    }
  }, [filters, applicationData, allLoaded, queriedApplicationData])

  function loadMore() {
    if (!applicationData || allLoaded || isSearching) return

    const oldest = applicationData[applicationData.length - 1].submissionDetails.submissionTime

    customFetch<Database.Applications.Apply[]>(
      `/api/db/forms/collection-group?applicationType=apply&limit=${PER_SECTION_LIMIT}&direction=desc&startAfter=${oldest}`
    ).then(({ data }) => {
      setApplicationData([...applicationData, ...data])
      if (data.length < PER_SECTION_LIMIT) return setAllLoaded(true)
    })
  }

  function getSelectedFormData() {
    return applicationData!.find(
      application => application.minecraftUuid === currentApplicationUuid
    )?.submissionDetails
  }

  function getFilteredApplications() {
    if (filteredApplicationData) return filteredApplicationData
    if (queriedApplicationData) return queriedApplicationData
    return applicationData!
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
                  Preform a fuzzy search on the {SEARCH_AMOUNT} newest applications, search by age,
                  Minecraft name, Minecraft UUID, or any question response.
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
            {
              title: 'Filter by status',
              paragraphs: [
                <>
                  Select one or multiple statuses to filter the newest {SEARCH_AMOUNT} applications.
                  This also filters the results from search.
                </>,
                <>
                  <Filter filterTags={filters} setFilterTags={setFilters} />
                </>,
              ],
            },
          ]}
        />
        <h2 className={review.subheader}>Select an application</h2>
        {applicationData ? (
          <CardSelector
            applications={getFilteredApplications()}
            currentApplicationUuid={currentApplicationUuid}
            setCurrentApplicationUuid={setCurrentApplicationUuid}
            loadMore={loadMore}
            allLoaded={allLoaded}
          />
        ) : (
          <CardSkeleton count={10} />
        )}
        {currentApplicationUuid === -1 || !applicationData ? (
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
        <Decision />
      </div>
    </>
  )
}
