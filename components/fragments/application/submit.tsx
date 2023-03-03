import FormBlocks, { Question } from '../blocks/form-blocks'

import application from './application.module.scss'

export default function Submit() {
  const questions: Question[] = [
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
    {
      question: 'What version of Minecraft do you play?',
      type: 'checkboxes',
      required: true,
      options: ['Java Edition (PC, Mac)', 'Bedrock (Mobile, Console, Switch, Etc.)'],
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
        questions={questions}
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
