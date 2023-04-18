import { QueryResponse } from 'pages/api/db/forms/apply/collection-group'
import applicationNavigation from './application-navigation.module.scss'
import { useMemo } from 'react'

export default function ApplicationNavigation({
  applicationData,
  currentApplicationUuid,
  setCurrentApplicationUuid,
  loadMore,
  allLoaded,
}: ApplicationNavigationProps) {
  const currentApplicationIndex = applicationData.findIndex(
    app => app.application.minecraftUuid === currentApplicationUuid
  )

  const prevApplicationId: undefined | string = useMemo(
    () => applicationData[currentApplicationIndex - 1]?.application.minecraftUuid,
    [applicationData, currentApplicationIndex]
  )
  const nextApplicationId: undefined | string = useMemo(
    () => applicationData[currentApplicationIndex + 1]?.application.minecraftUuid,
    [applicationData, currentApplicationIndex]
  )

  if (!nextApplicationId) loadMore()

  return (
    <div className={applicationNavigation.wrapper}>
      {prevApplicationId ? (
        <button
          onClick={() => {
            setCurrentApplicationUuid(prevApplicationId)
          }}>
          Previous Application
        </button>
      ) : (
        <div />
      )}
      {nextApplicationId ? (
        <button
          onClick={() => {
            setCurrentApplicationUuid(nextApplicationId)
          }}>
          Next Application
        </button>
      ) : allLoaded ? (
        <div />
      ) : (
        <p className={applicationNavigation.loading}>Loading...</p>
      )}
    </div>
  )
}

interface ApplicationNavigationProps {
  applicationData: QueryResponse[]
  currentApplicationUuid: string
  setCurrentApplicationUuid: React.Dispatch<React.SetStateAction<string | -1>>
  loadMore: () => void
  allLoaded: boolean
}
