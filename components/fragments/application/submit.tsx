import { FormInfo, Section } from '../blocks/block-types'
import { SetStateAction, useEffect, useState } from 'react'

import FormBlocks from '../blocks/form-blocks/form-blocks'
import Loading from './loading'
import application from './application.module.scss'
import { useSession } from 'next-auth/react'

export default function Submit({ setCurrentStepIndex }: SubmitProps) {
  const [customError, setCustomError] = useState<string | undefined>()
  const [answers, setAnswers] = useState<undefined | FormInfo>()
  const { status, data } = useSession()

  useEffect(() => {
    if (status === 'authenticated') {
      if (data.hasApplied) {
        fetch('/api/db/docs?path=applications/{id}/types/debug')
          .then(r => {
            if (r.status === 200) {
              r.json().then(r => setAnswers(r.data))
            }
          })
          .catch(e => console.warn(e))
      }
    }
  }, [data?.hasApplied, status])

  /* const sections: Section[] = [
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
  ] */

  const sections: Section[] = [
    {
      sectionTitle: 'Debug Form',

      questions: [
        {
          question: 'Debug Question',
          type: 'short-answer',
          required: false,
        },
        {
          question: 'Checkbox Test',
          type: 'checkboxes',
          required: false,
          options: ['Test.d,..d,.,,', "['ldwp;l';'a;pwld'p", 'owo'],
        },
        {
          question: 'MC Username test',
          type: 'minecraft-skin',
          required: false,
        },
      ],
    },
  ]

  return (
    <>
      {status === 'loading' ||
      (status === 'authenticated' && data.hasApplied && answers === undefined) ? (
        <Loading hideTitle />
      ) : (
        <>
          <div className={application.informationBlock}>
            <h2>Fill out the application</h2>
            <p>
              Make sure to read the rules before doing the application! We have an acceptance rate
              of about 70% so good luck.
            </p>
          </div>

          <FormBlocks
            sections={sections}
            numbered
            formInfo={answers}
            error={[customError, setCustomError]}
            checks={[
              () => {
                // Check with the Discord Bot to see if the person applying is in the Discord server.

                // TODO: Implement this check.
                return undefined

                // return 'You must join the Streamline SMP Discord to apply!'
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
                    setCustomError(
                      `Oh no! A critical error has occurred. Check your network connection.`
                    )
                    console.warn(e)
                  })

                console.log('Form submitted!', formInfo)
              },
            }}
          />
        </>
      )}
    </>
  )
}

interface SubmitProps {
  setCurrentStepIndex: (value: SetStateAction<number | undefined>) => void
}
