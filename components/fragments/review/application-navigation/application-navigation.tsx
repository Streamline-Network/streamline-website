import { QueryResponse } from 'pages/api/db/forms/apply/collection-group'
import applicationNavigation from './application-navigation.module.scss'

export default function ApplicationNavigation({
  applicationData,
  currentApplicationUuid,
  setCurrentApplicationUuid,
}: ApplicationNavigationProps) {
  const currentApplicationIndex = applicationData.findIndex(
    app => app.application.minecraftUuid === currentApplicationUuid
  )

  const prevApplicationId: undefined | string =
    applicationData[currentApplicationIndex - 1]?.application.minecraftUuid
  const nextApplicationId: undefined | string =
    applicationData[currentApplicationIndex + 1]?.application.minecraftUuid

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
      ) : (
        <div />
      )}
    </div>
  )
}

interface ApplicationNavigationProps {
  applicationData: QueryResponse[]
  currentApplicationUuid: string
  setCurrentApplicationUuid: React.Dispatch<React.SetStateAction<string | -1>>
}
