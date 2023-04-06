import { ProfileBody, ProfileData } from 'pages/api/minecraft/profiles'
import { useEffect, useState } from 'react'

import { Database } from 'pages/api/db/database'
import FormBlocks from '../blocks/form-blocks/form-blocks'
import Loading from './loading'
import { MembersData } from 'pages/api/discord/members'
import { Section } from '../blocks/block-types'
import { SetNicknameData } from 'pages/api/discord/set-nickname'
import { StateData } from 'pages/api/db/sets/state'
import application from './application.module.scss'
import customFetch from 'utils/fetch'

const CRITICAL_ERROR_MESSAGE =
  'Oh no! A critical error has occurred. Check your network connection.'

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

  const sections: Section[] = [
    {
      sectionTitle: 'Intro',
      description: 'Tell us about yourself.',

      questions: [
        {
          question: 'What is your Minecraft Java Edition username?',
          type: 'minecraft-skin',
          placeholderText: 'Put your exact Java Edition username here...',
          required: true,
        },
        {
          question: 'Do you have a nickname you want to be called?',
          description: 'This will show in discord next to your Minecraft name.',
          type: 'short-answer',
          required: false,
        },
        {
          question: 'What version of Minecraft do you play?',
          type: 'checkboxes',

          options: ['Java Edition', 'Bedrock Edition'],
          required: true,
        },
        {
          question: 'How old are you?',
          type: 'short-answer',
          required: true,
        },
        {
          question: 'How did you find out about Streamline SMP?',
          type: 'short-answer',
          required: false,
        },
        {
          question: 'Why do you want to join Streamline SMP?',
          type: 'paragraph',
          required: true,
        },
        {
          question: 'Do you use any special client? If so, what?',
          type: 'short-answer',
          placeholderText: 'Example: Badlion, Wurst, Meteor, Fabric, Forge, etc.',
          required: false,
        },
      ],
    },
    {
      sectionTitle: 'Scenarios',
      description: 'Tell us what you think is the best action based on the scenarios and rules.',

      questions: [
        {
          question:
            "You want to use a village, but there is signs of other players' activity in it. What do you do?",
          type: 'paragraph',
          required: true,
        },
        {
          question:
            'If you had a chest in your base that got all of its items stolen from it and you saw a player running from your chest, what would you do?',
          type: 'paragraph',
          required: true,
        },
        {
          question: 'If someone approached you and started attacking you, what would you do?',
          type: 'paragraph',
          required: true,
        },
        {
          question:
            'You find what looks to be an old abandoned base with some starter items, what do you do?',
          type: 'paragraph',
          required: true,
        },
        {
          question: 'In the shopping district a creeper blows up, what do you do?',
          type: 'paragraph',
          required: true,
        },
        {
          question:
            'Someone offers you a high amount of diamonds for an item that is sold for cheap at someone’s shop. What do you do?',
          type: 'paragraph',
          required: true,
        },
        {
          question: 'Your close friend tells you that they are x-raying, what do you do?',
          type: 'paragraph',
          required: true,
        },
      ],
    },
    {
      sectionTitle: 'Final',
      description: 'Almost done, just a few finishing questions!',

      questions: [
        {
          question: 'You are unsure about a rule, how do you figure things out?',
          type: 'paragraph',
          required: true,
        },
        {
          question:
            'At how many retributions do you get your first ban and at how many do you get permanently banned?',
          type: 'short-answer',
          required: true,
        },
        {
          question: 'Join the Discord.',
          description:
            'Everything we do is on Discord, it is how we communicate and work together.',
          type: 'button',
          buttonText: 'Join',
          required: true,
          link: 'https://discord.gg/EAe4S6HdVC',
        },
      ],
    },
  ]

  return (
    <>
      <div className={application.informationBlock}>
        <h2>Fill out the application</h2>
        <p>
          Make sure to read the rules before doing the application! We have an acceptance rate of
          about 70% so good luck.
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
          checks={[
            async () => {
              // Check with the Discord Bot to see if the person applying is in the Discord server.
              try {
                const { data } = await customFetch<MembersData>('/api/discord/members')
                const { data: idData } = await customFetch<Database.UserIds>(
                  '/api/db/docs?path=userIds/{email}'
                )

                if ('error' in data) return 'A critical error occurred.'

                if ((data.members as string[]).includes(idData.providerAccountId)) {
                  return undefined
                }

                return 'You must join the Streamline SMP Discord to apply!'
              } catch (error) {
                return CRITICAL_ERROR_MESSAGE + ' JOINED_CHECK'
              }
            },
            async formInfo => {
              // Set nickname on Discord to Minecraft name.
              const regex = /\((.*?)\)/

              async function formatAndSetNickname(username: string, nickname: string) {
                const finalNickname = nickname ? `${username} (${nickname.trim()})` : username

                const { response } = await customFetch<undefined, SetNicknameData>(
                  '/api/discord/set-nickname',
                  'POST',
                  { nickname: finalNickname }
                )

                if (!response.ok) {
                  return 'Unexpected error occurred. SET_NICK'
                } else return undefined
              }

              try {
                // Check if nickname with Minecraft name is too long.
                const MAX_DISCORD_NICKNAME_LENGTH = 32

                const nickname = formInfo['Do you have a nickname you want to be called?'].trim()

                if (!nickname) return undefined

                if (regex.test(nickname)) return 'Nickname cannot have parentheses.'

                const username = formInfo['What is your Minecraft Java Edition username?'].trim()

                if (nickname.length + username.length + 3 > MAX_DISCORD_NICKNAME_LENGTH) {
                  return 'Nickname is too long!'
                } else {
                  // Set the nickname on Discord.
                  return formatAndSetNickname(username, nickname)
                }
              } catch (error) {
                return CRITICAL_ERROR_MESSAGE + ' NICKNAME_CHECK'
              }
            },
          ]}
          submit={{
            agreements: [
              {
                agreement: 'Agree to the rules.',
                link: 'https://docs.google.com/document/d/15fSrpzbVmg0gipyZF9MBiK5JPCymrWZOAImNA3a-_9Q/edit?usp=sharing',
              },
              { agreement: 'Agree to the privacy policy.' },
            ],
            final() {
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
                .catch(() => setCustomError(CRITICAL_ERROR_MESSAGE + ' STAGE'))
            },
          }}
          save={formInfo => {
            // Get users Minecraft uuid to save in the database.
            customFetch<ProfileData, ProfileBody>('/api/minecraft/profiles', 'POST', {
              name: formInfo.answers['What is your Minecraft Java Edition username?'] as string,
            })
              .then(uuidData => {
                if (!uuidData.response.ok || 'error' in uuidData.data || !uuidData.data.uuid) {
                  return setCustomError('Could not get UUID! Try again later.')
                }

                // Push to database.
                customFetch<undefined, Database.Applications.Apply>('/api/db/forms/apply', 'POST', {
                  submissionDetails: formInfo,
                  minecraftUuid: uuidData.data.uuid,
                })
                  .then(({ response, data }) => {
                    if (response.ok) {
                      console.log('Form saved!', formInfo)
                    } else {
                      setCustomError(`An error occurred with the server! Please try again later.`)
                      console.warn(data)
                    }
                  })
                  .catch(e => {
                    setCustomError(CRITICAL_ERROR_MESSAGE + ' SUBMIT')
                    console.warn(e)
                  })
              })
              .catch(e => {
                setCustomError(CRITICAL_ERROR_MESSAGE + ' UUID')
                console.warn(e)
              })
          }}
        />
      )}
    </>
  )
}

interface SubmitProps {
  setCurrentStepIndex: (value: React.SetStateAction<number | undefined>) => void
}
