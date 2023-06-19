import LimitedTable, { TableRow } from 'components/fragments/blocks/limited-table'

import Blocks from 'components/fragments/blocks/blocks'
import Head from 'next/head'
import classNames from 'classnames'
import rules from './rules.module.scss'

export default function Rules() {
  const contentList: ContentItem[] = [
    { scrollId: 'dc', name: 'Discord/Chat Rules' },
    { scrollId: 'm', name: 'Minecraft Rules' },
    { scrollId: 's', name: 'Spawn Rules' },
    { scrollId: 'ede', name: 'Ender Dragon Egg Rules' },
    { scrollId: 'ret', name: 'What is a retribution?' },
  ]

  const discordRules: TableRow[] = [
    {
      start: '1.1',
      content:
        'Do not intentionally annoy, harass, be toxic, or promote to any users DMs, or in any channel.',
      end: '0.5 - 2',
    },
    {
      start: '1.2',
      content:
        'Do not make any inappropriate/rude comments about another user. Includes microaggression.',
      end: '1 - 2',
    },
    {
      start: '1.3',
      content:
        'Do not start drama. Do not bring drama from other social media (YouTube, Twitter, Discord, etc.) to this server.',
      end: '0.5 - 1.5',
    },
    {
      start: '1.4',
      content: 'No racism.',
      end: '3 - 4',
    },
    {
      start: '1.5',
      content:
        'No nudity. Do not post any kind of sexually suggestive images or nudity in the chats, this includes audio, saying things in VC, etc.',
      end: '1 - 5',
    },
    {
      start: '1.6',
      content:
        'While Profanity is allowed on the server, please refrain from using excessive profanity.',
      end: '0.5',
    },
    {
      start: '1.7',
      content:
        "Speak English only. It's difficult to moderate other languages. If someone is insulting someone, or breaking rules, in another language, it will be difficult to know.",
      end: '0.5',
    },
    {
      start: '1.8',
      content:
        'No spamming messages, do not @ more than 3 people or a person more than 3 times within 2 minutes, and do not purposely ghost ping people.',
      end: '0.5 - 1',
    },
    {
      start: '1.9',
      content:
        "Don't be excessively inappropriate or make people uncomfortable. (This rule is excluded in the Mature channels)",
      end: '0.5 - 3',
    },
    {
      start: '1.10',
      content:
        "Don't do annoying sounds whilst in a voice channel. (earrape, loud screaming, funny mic)",
      end: '0.5',
    },
    {
      start: '1.11',
      content: "Don't join with an alt account without permission.",
      end: '0.5',
    },
    {
      start: '1.12',
      content:
        'Advertise only videos and photos recorded on Streamline SMP in #streamline-screenshots-and-videos.',
      end: '0.5 - 1',
    },
    {
      start: '1.13',
      content: 'Use all channels reasonably within their intended purpose.',
      end: '0.5',
    },
    {
      start: '1.14',
      content: 'Do not pretend to be and/or impersonate a staff member.',
      end: '1.5',
    },
    {
      start: '1.15',
      content:
        'Do not try to find, share, or make loopholes in the rules. This is considered a violation of the rules.',
      end: '2',
    },
    {
      start: '1.16',
      content: 'Do not ignore a staff member`s request, or go against it.',
      end: '0.5 - 3',
    },
  ]

  const minecraftServerRules: TableRow[] = [
    { start: '2.1', content: "Don't be toxic / offensive in chat.", end: '1 - 2' },
    { start: '2.2', content: 'No exploits / hacking.', end: '1 - 5' },
    { start: '2.3', content: "No griefing - If it's not yours, don't touch it!", end: '1 - 5' },
    {
      start: '2.4',
      content:
        'No redstone lag machines (this includes lagging the server in anyway intentionally/accidentally) - If the farm makes the server lag then you will be asked to not use it, using it even after that would result in us removing the farm.',
      end: '0.5 - 5',
    },
    { start: '2.5', content: 'No Advertising / Spam', end: '0.5 - 2' },
    {
      start: '2.6',
      content: 'Respect staff requests - Please listen to and respect all staff requests.',
      end: '1.5',
    },
    {
      start: '2.7',
      content:
        'No killing other players or their mobs with malicious intent unless agreed upon by the player.',
      end: '0.5 - 3',
    },
    {
      start: '2.8',
      content:
        "'No stealing, this includes scams, deception, taking items which don't belong to you without the item owner's consent, not paying the right amount of diamonds in a shop, etc.",
      end: '1 - 5',
    },
    {
      start: '2.9',
      content: 'Do not pretend to be and/or impersonate a staff member.',
      end: '1.5',
    },
    {
      start: '2.10',
      content:
        "No reselling of bought goods -- this doesn't include buying raw materials for products.",
      end: '0.5',
    },
    {
      start: '2.11',
      content:
        'No building obstructions within the spawn area, or any massive structures in spawn without permission from a staff member.',
      end: '0.5',
    },
    {
      start: '2.12',
      content:
        'Not respecting authority, this includes intentionally ignoring players requests / posted signs or disrupting their intentions.',
      end: '0.5 - 1',
    },
  ]

  const spawnRules: TableRow[] = [
    { start: '3.1', content: "Repair creeper holes and don't leave trees floating!", end: '0.5' },
    { start: '3.2', content: 'Replant trees every time you chop one down!', end: '0.5' },
    {
      start: '3.3',
      content: "Keep the spawn pretty, don't mine out big holes or leave blocks.",
      end: '0.5',
    },
    { start: '3.4', content: "Don't just make a shop with chests on the ground!", end: '0.5' },
    { start: '3.5', content: "Don't randomly take anything without asking!", end: '0.5' },
    {
      start: '3.6',
      content: "Make your shop look good! It's not required but it helps.",
      end: '0.5',
    },
    {
      start: '3.7',
      content:
        "If the plot has not sold any goods and has been obviously neglected or abandoned for at least 2 weeks it will be repossessed back to the server and be resold for profit by the server! (This doesn't apply to people who have a reason to be inactive like a vacation, just leave a sign on your plot saying that you will be gone.)",
      end: '0.5',
    },
    {
      start: '3.8',
      content:
        'If you build something near one of the public North, South, East, or West Nether Paths, spawn proof it.',
      end: '0.5',
    },
  ]

  const enderDragonRules: TableRow[] = [
    {
      start: '4.1',
      content: 'The owner has to share the egg with people that want the advancement.',
      end: '0.5',
    },
    {
      start: '4.2',
      content: 'The egg can be traded freely as a normal good, with the exception of tax.',
      end: '0.5',
    },
    {
      start: '4.3',
      content: 'Destroying the egg is considered griefing.',
      end: '0.5',
    },
  ]

  const retributionStages: RetributionStage[] = [
    {
      color: 'green',
      explanation:
        "You're clean! This means that as far as we're concerned, you have done nothing wrong! If you had done something wrong in the past, it is now off your record.",
    },
    {
      color: 'blue',
      explanation:
        'This is a little worse, still not a big deal mostly. Just be more careful next time and maybe read up a bit on the rules. ',
    },
    {
      color: 'purple',
      explanation:
        'In most cases, this will be your last chance without a serious punishment for breaking a rule. You still have a chance though so be extra careful!',
    },
    {
      color: 'yellow',
      explanation:
        'This results in an immediate temporary ban, this ban is usually around 3 days long, but may be different depending on the circumstances. After the ban, some retributions will be dropped.',
    },
    {
      color: 'orange',
      explanation:
        'This is significantly more serious, this will result in another temporary ban, but this time, for 1 week, but may be different depending on the circumstances. After the ban, some retributions will be dropped.',
    },
    {
      color: 'red',
      explanation:
        '5 or more retributions means you are now permanently banned until at least the next season, with very few ways of changing that. See you next season!',
    },
  ]

  return (
    <>
      <Head>
        <title>Streamline SMP Rules</title>
      </Head>
      <h1 className={classNames('orange', rules.title)}>Rules</h1>
      <div>
        <h2 className={rules.subheader}>Page Contents:</h2>
        <div className={rules.block}>
          <ul className={rules.contentList}>
            {contentList.map((contentItem, i) => (
              <li key={i}>
                <a href={'#' + contentItem.scrollId}>{contentItem.name}</a>
              </li>
            ))}
          </ul>
        </div>

        <h2 id="dc" className={rules.subheader}>
          Discord/Chat Rules
        </h2>
        <LimitedTable
          labels={{ start: 'Rule identifier', content: 'Rule', end: 'Punishment in retributions' }}
          rows={discordRules}
        />

        <h2 id="m" className={rules.subheader}>
          Minecraft Rules
        </h2>
        <LimitedTable
          labels={{ start: 'Rule identifier', content: 'Rule', end: 'Punishment in retributions' }}
          rows={minecraftServerRules}
        />

        <h2 id="s" className={rules.subheader}>
          Spawn Rules
        </h2>
        <LimitedTable
          labels={{ start: 'Rule identifier', content: 'Rule', end: 'Punishment in retributions' }}
          rows={spawnRules}
        />

        <h2 id="ede" className={rules.subheader}>
          Ender Dragon Egg Rules
        </h2>
        <LimitedTable
          labels={{ start: 'Rule identifier', content: 'Rule', end: 'Punishment in retributions' }}
          rows={enderDragonRules}
        />

        <h2 id="ret" className={rules.subheader}>
          Retributions and How They Work
        </h2>
        <div>
          <div className={rules.retributionSection}>
            <div>
              <Blocks
                blockArr={[
                  {
                    title: 'What are Retributions?',
                    paragraphs: [
                      <>
                        Retributions are our way of keeping track of who breaks rules and who
                        doesn&apos;t. The more retributions you have, the worse. There is only one
                        way to get a retribution, break a rule. See the #rules channel and click on
                        the link to see the consequences for each rule broken.
                      </>,
                    ],
                  },
                  {
                    title: 'Can I get them removed?',
                    paragraphs: [
                      <>
                        Yes, if enough time has passed, you can ask for them to be removed. Some
                        retributions may be auto removed after a certain amount of time.
                      </>,
                    ],
                  },
                  {
                    title: 'What are the consequences?',
                    paragraphs: [
                      <>
                        There are many different consequences depending on the situation, but the
                        common ones are: kick, mute, get @streamliners role removed, temporary ban,
                        permanent ban etc.
                      </>,
                    ],
                  },
                ]}
              />
            </div>
            <div className={rules.block}>
              {retributionStages.map((stage, i) => (
                <div className={classNames(stage.color, rules.retributionStage)} key={i}>
                  <span className={rules.retributionStageIdentifier}>Retribution {i}</span>
                  <span>{stage.explanation}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

type ContentItem = {
  scrollId: string
  name: string
}

type RetributionStage = {
  color: string
  explanation: string
}
