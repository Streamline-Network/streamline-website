import { FormInfo, Section } from '../blocks/block-types'
import { SetStateAction, useEffect, useState } from 'react'

import FormBlocks from '../blocks/form-blocks/form-blocks'
import Loading from './loading'
import application from './application.module.scss'

const CRITICAL_ERROR_MESSAGE =
  'Oh no! A critical error has occurred. Check your network connection.'

export default function Submit({ setCurrentStepIndex }: SubmitProps) {
  const [customError, setCustomError] = useState<string | undefined>()
  const [answers, setAnswers] = useState<undefined | FormInfo>()
  const [hasFetched, setHasFetched] = useState(false)

  useEffect(() => {
    fetch('/api/db/docs?path=applications/{id}/types/apply')
      .then(r => {
        if (r.status === 200) {
          r.json().then(r => {
            setAnswers(r.data)
            setHasFetched(true)
          })
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
          formInfo={answers}
          error={[customError, setCustomError]}
          checks={[
            async () => {
              // Check with the Discord Bot to see if the person applying is in the Discord server.
              try {
                const data = await (await fetch('/api/discord/members')).json()
                const idData = await (await fetch('/api/db/docs?path=userIds/{email}')).json()

                if (data.error) return 'A critical error occurred.'

                if ((data.members as string[]).includes(idData.data.providerAccountId)) {
                  return undefined
                }

                return 'You must join the Streamline SMP Discord to apply!'
              } catch (error) {
                return CRITICAL_ERROR_MESSAGE + ' JOINED_CHECK'
              }
            },
            async formInfo => {
              const regex = /\((.*?)\)/

              async function setNickname(username: string, nickname?: string) {
                const idData = await (await fetch('/api/db/docs?path=userIds/{email}')).json()

                const finalNickname = nickname ? `${username} (${nickname.trim()})` : username

                const data = await fetch('/api/discord/set-nickname', {
                  method: 'POST',
                  body: JSON.stringify({
                    discordId: idData.data.providerAccountId,
                    nickname: finalNickname,
                  }),
                })

                if (data.status !== 200) {
                  return 'Unexpected error occurred.'
                } else return undefined
              }

              try {
                // Check if nickname with Minecraft name is too long.
                const MAX_DISCORD_NICKNAME_LENGTH = 32

                const nickname = formInfo['Do you have a nickname you want to be called?']

                if (!nickname) return undefined

                if (regex.test(nickname)) return 'Nickname cannot have parentheses.'

                const username = formInfo['What is your Minecraft Java Edition username?']

                if (nickname.length + username.length + 3 > MAX_DISCORD_NICKNAME_LENGTH) {
                  return 'Nickname is too long!'
                } else {
                  // Set the nickname on Discord.
                  return setNickname(username, nickname)
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
            submitCallback(formInfo) {
              fetch('/api/db/forms/apply', { method: 'POST', body: JSON.stringify(formInfo) })
                .then(r => {
                  if (r.status === 200) {
                    setCurrentStepIndex(1)
                  } else {
                    setCustomError(`An error occurred with the server! Please try again later.`)
                    console.warn(r)
                  }
                })
                .catch(e => {
                  setCustomError(CRITICAL_ERROR_MESSAGE + ' SUBMIT')
                  console.warn(e)
                })

              console.log('Form submitted!', formInfo)
            },
          }}
        />
      )}
    </>
  )
}

interface SubmitProps {
  setCurrentStepIndex: (value: SetStateAction<number | undefined>) => void
}
