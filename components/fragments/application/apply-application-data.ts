import { Section } from '../blocks/block-types'

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
        description: 'Everything we do is on Discord, it is how we communicate and work together.',
        type: 'button',
        buttonText: 'Join',
        required: true,
        link: 'https://discord.gg/EAe4S6HdVC',
      },
    ],
  },
]

export const agreements = [
  {
    agreement: 'Agree to the rules.',
    link: 'https://docs.google.com/document/d/15fSrpzbVmg0gipyZF9MBiK5JPCymrWZOAImNA3a-_9Q/edit?usp=sharing',
  },
  { agreement: 'Agree to the privacy policy.' },
]

export default sections
