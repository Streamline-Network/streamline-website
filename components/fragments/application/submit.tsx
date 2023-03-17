import { Question, Section } from '../blocks/block-types'

import FormBlocks from '../blocks/form-blocks'
import application from './application.module.scss'

export default function Submit() {
  /*

  ? Means optional

  * Intro

  What is your Minecraft Java Edition username?
  How old are you?
  ? How did you find out about Streamline?
  Why do you want to join Streamline?
  ? Do you use any special client? If so, what? E.x. Badlion, Wurst, Meteor, Fabric, Forge, etc.

  * Scenarios

  You want to use a village, but there's signs of other players' activity in it. What do you do?
  If you had a chest in your base that got all of its items stolen from it and you saw a player running from your chest, what would you do?
  If someone approached you and started attacking you, what would you do?
  You find what looks to be an old abandoned base with some starter items, what do you do?

  In the shopping district a creeper blows up, what do you do?
  Someone offers you a high amount of diamonds for an item that is sold for cheap at someone’s shop. What do you do?

  Your close friend tells you that they are x-raying, what do you do?

  * Final

  You’re unsure about a rule, what do you do?
  At how many retributions do you get your first ban and at how many do you get permanently banned?

  ! Join the Discord part (enforced by Discord bot)

  */

  const sections: Section[] = [
    {
      sectionTitle: 'OwO',
      description: 'This is a test section',

      questions: [
        {
          question: 'Why do you want to join Streamline SMP?',
          type: 'paragraph',
          required: true,
        },
        {
          question: 'What would you add to the server?',
          type: 'paragraph',
          required: true,
        },
        {
          question: 'What makes you better than the other possible players?',
          type: 'paragraph',
          required: true,
        },
        {
          question: 'Have you ever been punished on another server?',
          type: 'paragraph',
          required: true,
        },
        {
          question: 'How did you find out about the server?',
          type: 'short-answer',
          required: true,
        },
      ],
    },
    {
      sectionTitle: 'other section',

      questions: [
        {
          question: 'What version of Minecraft do you play?',
          type: 'checkboxes',
          required: true,
          options: ['Java Edition (PC or Mac)', 'Bedrock (Other)'],
        },
        {
          question: 'How old are you?',
          type: 'short-answer',
          required: true,
        },
        {
          question: 'What is your Minecraft username?',
          type: 'minecraft-skin',
          placeholderText: 'Put your exact Java Edition username here...',
          required: true,
        },
        {
          question: 'Have a nickname you prefer to be called?',
          description:
            'This will affect your Discord nickname, it will look like this: your-minecraft-name (your-nickname).',
          type: 'short-answer',
          required: false,
        },
        {
          question:
            'If you had a chest in your base that got all of its items stolen from it and you saw a player running from your chest, what would you do?',
          type: 'short-answer',
          required: true,
        },
        {
          question: 'Do you use any special client?',
          description: 'Examples: Badlion, Wurst, Meteor, Fabric, Forge, etc.',
          type: 'short-answer',
          required: true,
        },
      ],
    },
  ]

  return (
    <>
      <div className={application.informationBlock}>
        <h2>Fill out the application</h2>
        <p>
          The questions aren&apos;t that difficult but try to be as detailed as possible. We have an
          acceptance rate of about 70% so good luck!
        </p>
      </div>

      <FormBlocks
        sections={sections}
        numbered
        submit={{
          agreements: [
            {
              agreement: 'Agree to the rules.',
              link: 'https://docs.google.com/document/d/15fSrpzbVmg0gipyZF9MBiK5JPCymrWZOAImNA3a-_9Q/edit?usp=sharing',
            },
            { agreement: 'Agree to the privacy policy.' },
          ],
          submitCallback(formInfo) {
            console.log('Form submitted!', formInfo)
          },
        }}
      />
    </>
  )
}
