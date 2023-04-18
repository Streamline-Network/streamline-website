import Filter, { FilterTag } from '../../../../components/fragments/review/filter/filter'
import { useEffect, useState } from 'react'

import ApplicationNavigation from 'components/fragments/review/application-navigation/application-navigation'
import Blocks from 'components/fragments/blocks/blocks'
import CardSelector from 'components/fragments/review/cards/card-selector'
import CardSkeleton from 'components/fragments/review/cards/card-skeletons'
import CommentBlocks from 'components/fragments/blocks/comment-blocks'
import { Database } from 'pages/api/db/database'
import Decision from 'components/fragments/review/decision/decision'
import FormBlocks from 'components/fragments/blocks/form-blocks/form-blocks'
import FuzzySearch from 'fuzzy-search'
import HistoryDropdown from 'components/fragments/review/history-dropdown/history-dropdown'
import Loading from 'components/fragments/application/loading'
import { QueryResponse } from 'pages/api/db/forms/apply/collection-group'
import classNames from 'classnames'
import customFetch from 'utils/fetch'
import review from './review.module.scss'
import sections from 'components/fragments/application/apply-application-data'

export const PER_SECTION_LIMIT = 5
const SEARCH_AMOUNT = 50

export default function Review() {
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [applicationData, setApplicationData] = useState<QueryResponse[] | undefined>()
  const [currentApplicationUuid, setCurrentApplicationUuid] = useState<string | -1>(-1)
  const [queriedApplicationData, setQueriedApplicationData] = useState<QueryResponse[] | undefined>(
    undefined
  )
  const [filteredApplicationData, setFilteredApplicationData] = useState<
    QueryResponse[] | undefined
  >()
  const [allLoaded, setAllLoaded] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const [filters, setFilters] = useState<FilterTag[]>([
    { name: 'Pending Review', selected: false },
    { name: 'Denied', selected: false, state: 'denied' },
    { name: 'Held For Review', selected: false, state: 'pending' },
    { name: 'Accepted', selected: false, state: 'accepted' },
  ])
  const [history, setHistory] = useState<undefined | number>()
  const [hasFetched, setHasFetched] = useState(false)

  useEffect(() => {
    setHasFetched(false)
    customFetch<QueryResponse[]>(
      `/api/db/forms/apply/collection-group?applicationType=apply&limit=${PER_SECTION_LIMIT}&direction=desc`
    ).then(({ data }) => {
      setHasFetched(true)
      setApplicationData(data)
    })
  }, [])

  useEffect(() => {
    // Set history to undefined on ever application change.
    setHistory(undefined)
  }, [currentApplicationUuid])

  function fetchSearchData() {
    setApplicationData(undefined)
    setHasFetched(false)

    customFetch<QueryResponse[]>(
      `/api/db/forms/apply/collection-group?applicationType=apply&limit=${SEARCH_AMOUNT}&direction=desc`
    ).then(({ data }) => {
      setHasFetched(true)
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
      const questions = applicationData![0].application.submissionDetails.answers

      let final: string[] = []
      for (const question of Object.keys(questions)) {
        final.push(`application.submissionDetails.answers.${question}`)
      }

      return final
    }

    const searcher = new FuzzySearch(
      applicationData,
      ['application.minecraftUuid', ...getAllQuestions()],
      {
        sort: true,
      }
    )
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
        ? queriedApplicationData.filter(data => filterData(data.application))
        : applicationData.filter(data => filterData(data.application))

      setFilteredApplicationData(filteredData)

      setCurrentApplicationUuid(-1)
    }

    if (!isFiltering) {
      setFilteredApplicationData(undefined)
    }
  }, [filters, applicationData, allLoaded, queriedApplicationData])

  function loadMore() {
    if (!applicationData || allLoaded || isSearching) return

    const oldest =
      applicationData[applicationData.length - 1].application.submissionDetails.submissionTime

    setHasFetched(false)
    customFetch<QueryResponse[]>(
      `/api/db/forms/apply/collection-group?applicationType=apply&limit=${PER_SECTION_LIMIT}&direction=desc&startAfter=${oldest}`
    ).then(({ data }) => {
      setApplicationData([...applicationData, ...data])
      setHasFetched(true)
      if (data.length < PER_SECTION_LIMIT) return setAllLoaded(true)
    })
  }

  function getSelectedFormData() {
    const currentApplication = applicationData!.find(
      ({ application }) => application.minecraftUuid === currentApplicationUuid
    )!

    if (history) {
      return currentApplication.application.previousSubmissions!.find(
        app => app.submissionTime === history
      )
    }

    return currentApplication.application.submissionDetails
  }

  function getSelectedData() {
    return applicationData!.find(
      ({ application }) => application.minecraftUuid === currentApplicationUuid
    )
  }

  function getFilteredApplications() {
    if (filteredApplicationData)
      return filteredApplicationData.map(({ application }) => application)
    if (queriedApplicationData) return queriedApplicationData.map(({ application }) => application)
    return applicationData!.map(({ application }) => application)
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
          hasFetched ? (
            <div className={review.block}>
              <p>No results found!</p>
            </div>
          ) : (
            <Loading hideTitle />
          )
        ) : (
          <>
            <Blocks
              blockArr={[
                {
                  title: `${
                    getSelectedFormData()?.answers['What is your Minecraft Java Edition username?']
                  }'s application history`,
                  paragraphs: [
                    <>
                      <HistoryDropdown
                        applicationData={getSelectedData()!}
                        history={history}
                        setHistory={setHistory}
                      />
                    </>,
                  ],
                },
              ]}
            />

            <CommentBlocks
              applicationData={getSelectedData()!}
              setApplicationData={setApplicationData}
              currentApplicationUuid={currentApplicationUuid}
            />

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
          </>
        )}
        {currentApplicationUuid === -1 || !applicationData ? (
          hasFetched ? (
            <></>
          ) : (
            <Loading hideTitle />
          )
        ) : (
          <>
            <Decision
              applicationData={applicationData}
              setApplicationData={setApplicationData}
              currentApplicationUuid={currentApplicationUuid}
            />
            <ApplicationNavigation
              applicationData={filteredApplicationData ?? applicationData}
              currentApplicationUuid={currentApplicationUuid}
              setCurrentApplicationUuid={setCurrentApplicationUuid}
              loadMore={loadMore}
              allLoaded={allLoaded}
            />
          </>
        )}
      </div>
    </>
  )
}
