import { ProfileBody, ProfileData } from 'pages/api/minecraft/profiles'
import checks, { CRITICAL_ERROR_MESSAGE } from './checks'
import sections, { agreements } from './apply-application-data'
import { useEffect, useState } from 'react'

import { Database } from 'pages/api/db/database'
import FormBlocks from '../blocks/form-blocks/form-blocks'
import Link from 'next/link'
import Loading from './loading'
import { Notify } from 'pages/api/discord/notify-staff'
import { StateData } from 'pages/api/db/sets/state'
import application from './application.module.scss'
import customFetch from 'utils/fetch'

export default function Submit({ setCurrentStepIndex }: SubmitProps) {
  const [customError, setCustomError] = useState<string | undefined>()
  const [answers, setAnswers] = useState<undefined | Database.Applications.Apply>()
  const [hasFetched, setHasFetched] = useState(false)

  useEffect(() => {
    customFetch<Database.Applications.Apply>('/api/db/docs?path=applications/{id}/types/apply')
      .then(({ response, data }) => {
        if (response.ok) {
          setAnswers(data)
          setHasFetched(true)
        } else {
          setHasFetched(true)
        }
      })
      .catch(e => console.warn(e))
  }, [])

  return (
    <>
      <div className={application.informationBlock}>
        <h2>Fill out the application</h2>
        <p>
          Make sure to read the{' '}
          <Link href="/rules" target={'_blank'}>
            rules
          </Link>{' '}
          before doing the application! We have an acceptance rate of about 70% so good luck.
        </p>
      </div>

      {!hasFetched ? (
        <Loading hideTitle />
      ) : (
        <FormBlocks
          sections={sections}
          numbered
          formInfo={answers?.submissionDetails}
          error={[customError, setCustomError]}
          checks={checks}
          submit={{
            agreements: agreements,
            final(_, saveData) {
              Promise.all([
                customFetch<undefined, Notify>('/api/discord/notify-staff', 'POST', {
                  minecraftUuid: saveData.minecraftUuid,
                }),
                customFetch<undefined, StateData>('/api/db/sets/state', 'POST', {
                  entries: { applicationStage: 1 },
                })
                  .then(({ response }) => {
                    if (response.ok) {
                      console.log('All checks passed!')
                      setCurrentStepIndex(1)
                    } else {
                      setCustomError('There was an issue saving!')
                    }
                  })
                  .catch(() => setCustomError(CRITICAL_ERROR_MESSAGE + ' STAGE')),
              ])
            },
          }}
          save={async formInfo => {
            try {
              // Get users Minecraft uuid to save in the database.
              const uuidData = await customFetch<ProfileData, ProfileBody>(
                '/api/minecraft/profiles',
                'POST',
                {
                  name: formInfo.answers['What is your Minecraft Java Edition username?'] as string,
                }
              )

              const userUuid = await customFetch<Database.UserIds>(
                '/api/db/docs?path=userIds/{email}'
              )

              if (
                !uuidData.response.ok ||
                'error' in uuidData.data ||
                !uuidData.data.uuid ||
                !userUuid.response.ok
              ) {
                return { error: 'Could not get UUID! Try again later.' }
              }

              // Push to database.
              const { response, data } = await customFetch<undefined, Database.Applications.Apply>(
                '/api/db/forms/apply',
                'POST',
                {
                  submissionDetails: formInfo,
                  minecraftUuid: uuidData.data.uuid,
                  userUuid: userUuid.data.id,
                  type: 'apply',
                }
              )

              if (response.ok) {
                console.log('Form saved!', formInfo)
                return { minecraftUuid: uuidData.data.uuid, userUuid: userUuid.data.id }
              } else {
                console.warn(data)
                return { error: `An error occurred with the server! Please try again later.` }
              }
            } catch (error) {
              console.warn(error)
              return { error: CRITICAL_ERROR_MESSAGE + ' UUID' }
            }
          }}
        />
      )}
    </>
  )
}

interface SubmitProps {
  setCurrentStepIndex: (value: React.SetStateAction<number | undefined>) => void
}
